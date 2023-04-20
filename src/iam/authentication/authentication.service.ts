import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../users/entities/users.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import JwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new Users();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      await this.userRepository.save(user);
    } catch (e) {
      const pgUniqueViolationErrorCode = '23505';
      if (e.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw e;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException("Password doesn't match");
    }

    return await this.generateTokens(user);
  }

  private async generateTokens(user: Users) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.userRepository.findOneByOrFail({ id: sub });

      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}

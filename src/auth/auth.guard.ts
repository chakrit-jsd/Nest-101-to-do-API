import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContextHost): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { id } = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findOne(id as number);
      req['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@shared/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { accessToken } = request.cookies;

    if (!accessToken) throw new UnauthorizedException('Access token not found');

    const tokenPayload = this.jwtService.decode(accessToken);

    if (!tokenPayload || !(tokenPayload instanceof Object)) {
      throw new UnauthorizedException('Access token is malformed or invalid');
    }

    request.user = tokenPayload;

    return true;
  }
}

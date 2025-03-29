import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] =
        await this._jwtService.verifyAsync<Record<string, any>>(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers;
    const authHeaders: string | null = headers.has('authorization')
      ? headers.get('authorization')
      : '';

    if (authHeaders) {
      const type = authHeaders.split(' ')[0];
      const token = authHeaders.split(' ')[1];
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}

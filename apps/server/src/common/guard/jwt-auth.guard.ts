import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenUseCase } from 'src/module/auth/use-case/jwt-token.usecase';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ForbiddenError } from '../response/client-errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: TokenUseCase,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ForbiddenError(
        'Access token not found in Authorization header',
      );
    }
    try {
      const payload = this.jwtService.verifyAccessToken(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload;
    } catch {
      throw new ForbiddenError('Invalid or expired access token');
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers['authorization'];

    if (!authHeader || typeof authHeader !== 'string') {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

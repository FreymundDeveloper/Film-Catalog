import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateToken(request.headers.authorization);
  }

  private async validateToken(authHeader: string): Promise<boolean> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Invalid Token');
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      await this.jwtService.verifyAsync(token, { secret: 'The#whale?holed?the#ship' });
      return true;
    } catch (error) {
      console.error('Erro in token:', error);
      return false;
    }
  }
}

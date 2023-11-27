import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')

  //Swagger
  @ApiResponse({
    status: 200,
    description: 'Token created successfully',
    schema: {
      properties: {
        token: { type: 'string', description: 'Token code' },
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Server error' })

  //GET Logic
  async login(): Promise<{ token: string }> {
    const token = await this.authService.generateToken();

    return { token };
  }
}
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, RegisterDto } from './dto';
import { AuthGuard } from './auth.guard';
import type { AuthenticatedRequest } from './interfaces';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado; retorna dados do perfil e token JWT.',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Corpo inválido ou campos não permitidos (validação).',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Entrar com e-mail e senha' })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido; retorna dados do perfil e token JWT.',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'E-mail ou senha incorretos.',
  })
  @ApiBadRequestResponse({
    description: 'Corpo inválido ou campos não permitidos (validação).',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário autenticado (sem novo token).',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token ausente, inválido ou expirado.',
  })
  async profile(@Req() request: AuthenticatedRequest) {
    return this.authService.getProfile(request.user.id);
  }
}

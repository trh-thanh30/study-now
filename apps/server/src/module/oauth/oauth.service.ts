import { Injectable } from '@nestjs/common';
import { GoogleProfile } from 'src/common/types/google-profile.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenUseCase } from '../auth/use-case/jwt-token.usecase';
import { provider_type, user_role } from '@prisma/client';

@Injectable()
export class OauthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenUseCase: TokenUseCase,
  ) {}
  async validateGoogleUser(profile: GoogleProfile) {
    const { id, emails, name, photos, displayName } = profile;
    const email = emails[0].value;
    const firstName = name?.givenName || '';
    const lastName = name?.familyName || '';
    const picture = photos[0].value || null;

    let user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const { refresh_token, access_token } = this.tokenUseCase.generateTokenPair(
      {
        id: user?.id as string,
        email: user?.email as string,
        username: user?.username as string,
        role: user?.role as user_role,
      },
    );
    if (!user) {
      // create user (register)
      user = await this.prisma.user.create({
        data: {
          email,
          username: displayName,
          first_name: firstName,
          last_name: lastName,
          provider_id: id,
          refresh_token: refresh_token,
          is_verified: true,
          picture,
          provider_type: provider_type.GOOGLE as provider_type,
        },
      });
    } else {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { refresh_token: refresh_token, last_login_at: new Date() },
      });
    }

    return {
      id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      picture: user.picture,
      role: user.role,
      refresh_token,
      access_token,
    };
  }
}

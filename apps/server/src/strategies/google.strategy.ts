import type { ConfigType } from '@nestjs/config';
import { OauthService } from './../module/oauth/oauth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { oauthConfig } from 'src/config';

/**
 * This class is a strategy for the Google OAuth 2.0 API.
 * It extends the PassportStrategy class and overrides the validate method.
 * The validate method is called by the Passport library when a user is authenticated.
 * It takes three parameters: an access token, a refresh token, and a profile object.
 * It then calls the validateGoogleUser method of the OauthService to validate the user.
 * If the user is valid, it calls the done method with the user object.
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // ✅ AND THIS
  constructor(
    @Inject(oauthConfig.KEY)
    configOauth: ConfigType<typeof oauthConfig>,
    private readonly oauthService: OauthService, // lowercase convention
  ) {
    const {
      googleClientId,
      googleClientSecret,
      googleCallbackUrl,
      googleScope,
    } = configOauth;
    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
      scope: googleScope,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      console.log(profile);
      done(null, profile);
    } catch (error) {
      console.log(error);
      done(error, false);
    }
  }
}

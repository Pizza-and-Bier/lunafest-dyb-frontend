import { Injectable } from '@angular/core';

import { BaseAuthService } from '../base-services/auth.service';
import { AuthenticatedUser } from '../models';

@Injectable()
export class RegistrationService {

  constructor(private authService: BaseAuthService) { }

  public signupUser(user: AuthenticatedUser): Promise<void> {
    return this.authService.signup(user.email, user.password, {});
  }

}

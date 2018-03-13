import { Injectable } from '@angular/core';

import { BaseAuthService } from '../base-services';
import { User } from '../models';

@Injectable()
export class ForgotPasswordService {

  constructor(private authService: BaseAuthService) { }

  public userExists(email: string): Promise<any> {
    return this.authService.userExists(email);
  }

  public sendResetEmail(email: string): Promise<any> {
    return this.authService.sendPasswordResetEmail(email);
  }
}

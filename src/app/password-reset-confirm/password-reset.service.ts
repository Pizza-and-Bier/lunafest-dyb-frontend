import { Injectable } from '@angular/core';

import { BaseAuthService } from '../base-services';

@Injectable()
export class PasswordResetService {

  constructor(private authService: BaseAuthService) { }

  public resetPassword(password: string, code: string): Promise<any> {
    return this.authService.resetPassword(code, password);
  }
}

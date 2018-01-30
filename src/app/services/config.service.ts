import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";

@Injectable()
export class ConfigService {

  constructor() { }

  public static getApiBase(): string {
    return environment.apiBase;
  }

}

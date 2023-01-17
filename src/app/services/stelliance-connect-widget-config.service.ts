import { Injectable } from '@angular/core';
import { StellianceConnectWidgetConfig } from '../stelliance-connect-widget/stelliance-connect-widget-config.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CONFIG_URL } from './stelliance-connect-widget-config.constants';


const REDIRECT_PARAM = '&redirect_uri';

@Injectable({
  providedIn: 'root',
})
export class StellianceConnectWidgetConfigService {
  private configURL = CONFIG_URL;

  constructor(private http: HttpClient) {}

  getWidgetsConfig(): Observable<StellianceConnectWidgetConfig> {
    return this.http.get<StellianceConnectWidgetConfig>(this.configURL);
  }

  encodeRedirectUrl(url: string): string {
    const redirectUriIndex = url.indexOf(REDIRECT_PARAM) + REDIRECT_PARAM.length + 1;
    const redirectUri = url.substring(redirectUriIndex);
    const baseUrl = url.substring(0, redirectUriIndex);

    return `${baseUrl}${encodeURIComponent(redirectUri)}`;
  }
}

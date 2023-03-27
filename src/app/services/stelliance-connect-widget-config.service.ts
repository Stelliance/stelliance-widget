import {Injectable} from '@angular/core';
import {StellianceConnectWidgetConfig} from '../stelliance-connect-widget/stelliance-connect-widget-config.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";


const REDIRECT_PARAM = '&redirect_uri';

@Injectable({
  providedIn: 'root',
})
export class StellianceConnectWidgetConfigService {
  private configBaseURL;

  constructor(private http: HttpClient) {
    this.configBaseURL = environment.configBaseUrl;
  }

  getWidgetsConfig(environment: string): Observable<StellianceConnectWidgetConfig> {
    return this.http.get<StellianceConnectWidgetConfig>(this.configBaseURL+`/widget-apps-conf.${environment}.json`);
  }

  encodeRedirectUrl(url: string): string {
    const redirectUriIndex = url.indexOf(REDIRECT_PARAM) + REDIRECT_PARAM.length + 1;
    const redirectUri = url.substring(redirectUriIndex);
    const baseUrl = url.substring(0, redirectUriIndex);

    return `${baseUrl}${encodeURIComponent(redirectUri)}`;
  }
}

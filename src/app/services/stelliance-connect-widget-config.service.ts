import { Injectable } from '@angular/core';
import { StellianceConnectWidgetConfig } from '../stelliance-connect-widget/stelliance-connect-widget-config.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CONFIG_URL } from './stelliance-connect-widget-config.constants';

@Injectable({
  providedIn: 'root',
})
export class StellianceConnectWidgetConfigService {
  private configURL = CONFIG_URL;

  constructor(private http: HttpClient) {}

  getWidgetsConfig(): Observable<StellianceConnectWidgetConfig> {
    return this.http.get<StellianceConnectWidgetConfig>(this.configURL);
  }
}

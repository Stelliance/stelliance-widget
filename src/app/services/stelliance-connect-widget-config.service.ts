import { Injectable } from '@angular/core';
import { StellianceConnectWidgetConfig } from '../stelliance-connect-widget/stelliance-connect-widget-config.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG_URL } from './stelliance-connect-widget-config.constants';

@Injectable({
  providedIn: 'root',
})
export class StellianceConnectWidgetConfigService {
  private configURL = CONFIG_URL;

  constructor(private http: HttpClient) {}

  getWidgetsConfig(): Observable<Array<StellianceConnectWidgetConfig>> {
    return this.http.get<StellianceConnectWidgetConfig[]>(this.configURL);
  }
}

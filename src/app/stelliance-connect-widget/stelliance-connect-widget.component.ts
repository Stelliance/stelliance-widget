import { Component, Input, OnInit } from '@angular/core';
import { StellianceConnectWidgetConfigService } from '../services/stelliance-connect-widget-config.service';
import {
  StellianceConnectWidgetApplicationConfig,
  StellianceConnectWidgetConfig,
} from './stelliance-connect-widget-config.model';
import {
  DEFAULT_APP_LOGO_MAX_HEIGHT,
  DEFAULT_APP_LOGO_MAX_WIDTH,
  DEFAULT_MIN_CLICK_TO_FAVORITE,
} from './stelliance-connect-widget.constants';
import { CodeChallengeUtil } from '../../shared/util/code-challenge.util';

const STELLIANCE_CONNECT_LINKS_COUNTER = 'counter_stelliance_connect';

@Component({
  selector: 'stelliance-connect-widget',
  templateUrl: './stelliance-connect-widget.component.html',
  styleUrls: ['./stelliance-connect-widget.component.css'],
})
export class StellianceConnectWidgetComponent implements OnInit {
  @Input() appLogoWidth: string = DEFAULT_APP_LOGO_MAX_WIDTH;
  @Input() appLogoHeight: string = DEFAULT_APP_LOGO_MAX_HEIGHT;

  @Input() environment: 'dev' | 'prod' = 'prod';

  widgetsConfig: StellianceConnectWidgetConfig;
  widgetAppsFavorites: StellianceConnectWidgetApplicationConfig[] = [];
  widgetAppsNotFavorites: StellianceConnectWidgetApplicationConfig[] = [];

  showWidgets = false;

  private widgetAppsFavoritesLimit = DEFAULT_MIN_CLICK_TO_FAVORITE;

  constructor(private configService: StellianceConnectWidgetConfigService) {
    this.widgetsConfig = {
      applications: [],
      stelliance: { baseUrl: '' },
    };
  }

  ngOnInit(): void {
    this.configService.getWidgetsConfig().subscribe((widgetsConfig: StellianceConnectWidgetConfig) => {
      this.widgetsConfig = widgetsConfig;
      this.organizeWidgets();
    });
  }

  navigateTo(widgetApp: StellianceConnectWidgetApplicationConfig) {
    this.storeApplicationClicks(widgetApp);

    // Active to organize widgets dynamically
    this.organizeWidgets();

    const redirectUrl = widgetApp.urls.find((url) => url.env === this.environment);
    if (redirectUrl) {
      return CodeChallengeUtil.generate().then((code) => {

        const encodedRedirectUri = this.configService.encodeRedirectUrl(redirectUrl.redirectUri);

        let appRedirectUrl = `${this.widgetsConfig.stelliance.baseUrl}&kc_idp_hint=${widgetApp.idpName}&redirect_uri=${encodedRedirectUri}&code_challenge=${code}`;
        console.log(appRedirectUrl);
        return window.open(appRedirectUrl, '_blank');
      });
    }
    return Promise.reject('No redirect url found for environment' + this.environment);
  }

  private organizeWidgets() {
    this.widgetsConfig.applications.forEach((widgetApp) => {
      widgetApp.clickCount = Number(localStorage.getItem(`${STELLIANCE_CONNECT_LINKS_COUNTER}_${widgetApp.id}`)) || 0;
    });
    this.widgetsConfig.applications.sort((a, b) => b.clickCount - a.clickCount);

    this.widgetAppsNotFavorites = this.widgetsConfig.applications.filter(
      (widgetApp) => widgetApp.clickCount < this.widgetAppsFavoritesLimit
    );
    this.widgetAppsFavorites = this.widgetsConfig.applications.filter(
      (widgetApp) => widgetApp.clickCount >= this.widgetAppsFavoritesLimit
    );
  }

  private storeApplicationClicks(widgetApp: StellianceConnectWidgetApplicationConfig): void {
    const newValue = widgetApp.clickCount + 1;
    widgetApp.clickCount = newValue;
    localStorage.setItem(`${STELLIANCE_CONNECT_LINKS_COUNTER}_${widgetApp.id}`, newValue.toString());
  }
}

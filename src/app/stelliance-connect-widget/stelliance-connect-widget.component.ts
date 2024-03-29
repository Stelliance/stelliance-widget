import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class StellianceConnectWidgetComponent implements OnInit, OnDestroy {
  @Input() appLogoWidth: string = DEFAULT_APP_LOGO_MAX_WIDTH;
  @Input() appLogoHeight: string = DEFAULT_APP_LOGO_MAX_HEIGHT;

  @Input() environment: 'dev' | 'prod' = 'dev';

  @Input() position: 'left' | 'right' = 'left';

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
    document.addEventListener('click', this.onClickDocument.bind(this));

    this.configService.getWidgetsConfig(this.environment).subscribe((widgetsConfig: StellianceConnectWidgetConfig) => {
      this.widgetsConfig = widgetsConfig;
      this.organizeWidgets();
    });
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickDocument.bind(this));
  }

  navigateTo(widgetApp: StellianceConnectWidgetApplicationConfig) {
    this.storeApplicationClicks(widgetApp);

    // Active to organize widgets dynamically
    this.organizeWidgets();

    const redirectUrl = widgetApp.redirectUri;
    return CodeChallengeUtil.generate().then((code) => {
      const appRedirectUrl = `${this.widgetsConfig.stelliance.baseUrl}&kc_idp_hint=${
        widgetApp.idpName
      }&redirect_uri=${encodeURIComponent(redirectUrl)}&code_challenge=${code}`;
      return window.open(appRedirectUrl, '_blank');
    });
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

  private onClickDocument(event: MouseEvent) {
    event.stopPropagation();
    if (
      this.showWidgets &&
      !(event as any).path.some((target: HTMLElement) => target.id === 'stellianceWidgetGridIcon')
    ) {
      this.showWidgets = false;
    }
  }
}

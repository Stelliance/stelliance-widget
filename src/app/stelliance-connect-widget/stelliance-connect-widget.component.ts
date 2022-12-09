import { Component, Input, OnInit } from '@angular/core';
import { StellianceConnectWidgetConfigService } from '../services/stelliance-connect-widget-config.service';
import { StellianceConnectWidgetConfig } from './stelliance-connect-widget-config.model';
import {
  DEFAULT_APP_LOGO_MAX_HEIGHT,
  DEFAULT_APP_LOGO_MAX_WIDTH,
  DEFAULT_MIN_CLICK_TO_FAVORITE,
} from './stelliance-connect-widget.constants';

const STELLIANCE_CONNECT_LINKS_COUNTER = 'counter_stelliance_connect';

@Component({
  selector: 'stelliance-connect-widget',
  templateUrl: './stelliance-connect-widget.component.html',
  styleUrls: ['./stelliance-connect-widget.component.css'],
})
export class StellianceConnectWidgetComponent implements OnInit {
  @Input() appLogoWidth: string = DEFAULT_APP_LOGO_MAX_WIDTH;
  @Input() appLogoHeight: string = DEFAULT_APP_LOGO_MAX_HEIGHT;

  constructor(private configService: StellianceConnectWidgetConfigService) {}

  widgetApps: StellianceConnectWidgetConfig[] = [];
  widgetAppsFavorites: StellianceConnectWidgetConfig[] = [];
  widgetAppsNotFavorites: StellianceConnectWidgetConfig[] = [];

  showWidgets = false;

  private widgetAppsFavoritesLimit = DEFAULT_MIN_CLICK_TO_FAVORITE;

  ngOnInit(): void {
    this.configService.getWidgetsConfig().subscribe((configs: StellianceConnectWidgetConfig[]) => {
      this.widgetApps = configs;
      this.organizeWidgets();
    });
  }

  navigateTo(widgetApp: StellianceConnectWidgetConfig) {
    this.storeApplicationClicks(widgetApp);

    // Active to organize widgets dynamically
    this.organizeWidgets();

    // Navigate to app URL
    // TODO
  }

  private organizeWidgets() {
    this.widgetApps.forEach((widgetApp) => {
      widgetApp.clickCount = Number(localStorage.getItem(`${STELLIANCE_CONNECT_LINKS_COUNTER}_${widgetApp.id}`)) || 0;
    });
    this.widgetApps.sort(this.sortByMostClickedApps);

    this.widgetAppsNotFavorites = [];
    this.widgetAppsFavorites = [];
    this.widgetApps.forEach((widgetApp) =>
      (widgetApp.clickCount < this.widgetAppsFavoritesLimit
        ? this.widgetAppsNotFavorites
        : this.widgetAppsFavorites
      ).push(widgetApp)
    );
  }

  private sortByMostClickedApps(a: StellianceConnectWidgetConfig, b: StellianceConnectWidgetConfig): number {
    if (a.clickCount < b.clickCount) return 1;
    if (a.clickCount > b.clickCount) return -1;
    return 0;
  }

  private storeApplicationClicks(widgetApp: StellianceConnectWidgetConfig): void {
    const newValue = widgetApp.clickCount + 1;
    widgetApp.clickCount = newValue;
    localStorage.setItem(`${STELLIANCE_CONNECT_LINKS_COUNTER}_${widgetApp.id}`, newValue.toString());
  }
}

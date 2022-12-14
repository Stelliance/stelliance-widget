import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StellianceConnectWidgetApplicationConfig } from '../stelliance-connect-widget/stelliance-connect-widget-config.model';
import {
  DEFAULT_APP_LOGO_MAX_WIDTH,
  DEFAULT_APP_LOGO_MAX_HEIGHT,
} from '../stelliance-connect-widget/stelliance-connect-widget.constants';

@Component({
  selector: 'app-stelliance-connect-widget-apps',
  templateUrl: './stelliance-connect-widget-apps.component.html',
  styleUrls: ['./stelliance-connect-widget-apps.component.css'],
})
export class StellianceConnectWidgetAppsComponent {
  @Input() apps: StellianceConnectWidgetApplicationConfig[] = [];
  @Input() appLogoWidth: string = DEFAULT_APP_LOGO_MAX_WIDTH;
  @Input() appLogoHeight: string = DEFAULT_APP_LOGO_MAX_HEIGHT;

  @Output() widgetAppClicked = new EventEmitter<StellianceConnectWidgetApplicationConfig>();
}

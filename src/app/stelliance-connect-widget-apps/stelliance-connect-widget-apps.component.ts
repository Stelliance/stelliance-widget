import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StellianceConnectWidgetConfig } from '../stelliance-connect-widget/stelliance-connect-widget-config.model';
import {
  DEFAULT_APP_LOGO_HEIGHT,
  DEFAULT_APP_LOGO_WIDTH,
} from '../stelliance-connect-widget/stelliance-connect-widget.constants';

@Component({
  selector: 'app-stelliance-connect-widget-apps',
  templateUrl: './stelliance-connect-widget-apps.component.html',
  styleUrls: ['./stelliance-connect-widget-apps.component.css'],
})
export class StellianceConnectWidgetAppsComponent {
  @Input() apps: StellianceConnectWidgetConfig[] = [];
  @Input() appLogoWidth: string = DEFAULT_APP_LOGO_WIDTH;
  @Input() appLogoHeight: string = DEFAULT_APP_LOGO_HEIGHT;

  @Output() widgetAppClicked = new EventEmitter<StellianceConnectWidgetConfig>();
}

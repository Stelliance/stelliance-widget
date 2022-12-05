import { Component, OnInit } from '@angular/core';
import { StellianceConnectWidgetConfig } from './stelliance-connect-widget-config.model';

const STELLIANCE_CONNECT_LINKS_COUNTER = 'counter_stelliance_connect';

@Component({
  selector: 'stelliance-connect-widget',
  templateUrl: './stelliance-connect-widget.component.html',
  styleUrls: ['./stelliance-connect-widget.component.css'],
})
export class StellianceConnectWidgetComponent implements OnInit {
  public widgetApps: StellianceConnectWidgetConfig[] = [
    {
      id: 'hiveo',
      logo: 'https://lh3.googleusercontent.com/JLXPNxeFb6nYW_fQRE6JT2N7OU4GLytGn5d2i5ljBw-B2N6C8TZ9VN2PXLhLkeLOefMEkdz8vYliRVm4Y7y4',
      name: 'Hiveo',
    },
    {
      id: 'conformitee',
      logo: 'data:image/png;base64,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',
      name: 'Conformitee',
    },
    {
      id: 'viaco',
      logo: 'https://c.smartrecruiters.com/sr-careersite-image-prod-dc5/5ed53051e3261858ae571e66/0549d054-280d-44de-86d1-0f9b9635f6cf?r=s3-eu-central-1',
      name: 'Viaco',
    },
    {
      id: 'sis',
      logo: 'https://uploads-ssl.webflow.com/602be30475e9ea3cc47ec886/60f7dec17298039a8036b7cc_images-24-06-2021-09-33-665.png',
      name: 'Sis ID',
    },
  ];

  ngOnInit(): void {
    console.log('stelliance widget is initialized');

    this.widgetApps.forEach((widgetApp) => {
      widgetApp.clickCount = Number(localStorage.getItem(`${STELLIANCE_CONNECT_LINKS_COUNTER}_${widgetApp.id}`)) || 0;
    });

    this.widgetApps.sort(this.sortByMostClickedApps);
  }

  navigateTo(widgetApp: StellianceConnectWidgetConfig) {
    // add count click
    this.storeApplicationClicks(widgetApp);

    // navigate to app URL
    // TODO
  }

  private sortByMostClickedApps(a: StellianceConnectWidgetConfig, b: StellianceConnectWidgetConfig): number {
    a.clickCount = a.clickCount !== undefined ? a.clickCount : 0;
    b.clickCount = b.clickCount !== undefined ? b.clickCount : 0;
    if (a.clickCount < b.clickCount) return 1;
    if (a.clickCount > b.clickCount) return -1;
    return 0;
  }

  private storeApplicationClicks(widgetApp: StellianceConnectWidgetConfig): void {
    const newValue = widgetApp.clickCount ? widgetApp.clickCount + 1 : 1;
    widgetApp.clickCount = newValue;
    localStorage.setItem(`${STELLIANCE_CONNECT_LINKS_COUNTER}_${widgetApp.id}`, newValue.toString());
  }
}

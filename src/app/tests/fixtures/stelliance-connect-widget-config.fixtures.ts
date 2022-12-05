import { StellianceConnectWidgetConfig } from '../../stelliance-connect-widget/stelliance-connect-widget-config.model';

export class StellianceConnectWidgetFixtures {
  static aStellianceConnectWidgetConfig(): StellianceConnectWidgetConfig[] {
    return [
      {
        id: 'id1',
        logo: 'logo1',
        name: 'name1',
      },
      {
        id: 'id2',
        logo: 'logo2',
        name: 'name2',
      },
      {
        id: 'id3',
        logo: 'logo3',
        name: 'name3',
      },
    ];
  }
}

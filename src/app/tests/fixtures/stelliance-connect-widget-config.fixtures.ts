import { StellianceConnectWidgetConfig } from '../../stelliance-connect-widget/stelliance-connect-widget-config.model';

export class StellianceConnectWidgetFixtures {
  static aStellianceConnectWidgetConfig(): StellianceConnectWidgetConfig {
    return {
      stelliance: {
        baseUrl: 'http://localhost',
      },
      applications: [
        {
          id: 'id1',
          logo: 'logo1',
          name: 'name1',
          clickCount: 0,
          idpName: 'idp1',
          urls: [
            {
              env: 'prod',
              redirectUri: 'http://redirect-uri/idp1',
            },
          ],
        },
        {
          id: 'id2',
          logo: 'logo2',
          name: 'name2',
          clickCount: 0,
          idpName: 'idp2',
          urls: [
            {
              env: 'prod',
              redirectUri: 'http://redirect-uri/idp2',
            },
          ],
        },
        {
          id: 'id3',
          logo: 'logo3',
          name: 'name3',
          clickCount: 0,
          idpName: 'idp3',
          urls: [
            {
              env: 'prod',
              redirectUri: 'http://redirect-uri/idp3',
            },
          ],
        },
        {
          id: 'id4',
          logo: 'logo4',
          name: 'name4',
          clickCount: 0,
          idpName: 'idp4',
          urls: [
            {
              env: 'prod',
              redirectUri: 'http://redirect-uri/idp4',
            },
          ],
        },
      ],
    };
  }
}

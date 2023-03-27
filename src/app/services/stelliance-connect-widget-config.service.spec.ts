import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { StellianceConnectWidgetFixtures } from '../tests/fixtures/stelliance-connect-widget-config.fixtures';
import { StellianceConnectWidgetConfigService } from './stelliance-connect-widget-config.service';

describe('StellianceConnectWidgetConfigService tests', () => {
  let widgetConfigService: StellianceConnectWidgetConfigService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const aConfig = StellianceConnectWidgetFixtures.aStellianceConnectWidgetConfig();

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    widgetConfigService = new StellianceConnectWidgetConfigService(httpClientSpy);
  });

  it('should return config (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(aConfig));

    widgetConfigService.getWidgetsConfig('test').subscribe({
      next: (configs) => {
        expect(configs).toEqual(aConfig);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should encode redirect uri', () => {
    const redirectUrl = widgetConfigService.encodeRedirectUrl(
      'https://lemur-7.cloud-iam.com/auth/realms/plateforme-de-test-2/protocol/openid-connect/auth?client_id=account-console&redirect_uri=https://lemur-7.cloud-iam.com/auth/realms/plateforme-de-test-2/account/#/&response_mode=fragment&response_type=code&scope=openid&code_challenge=AL0a6Zru52f0_NnRsgzAW1QVb_WEmkigipuiud4InvY&code_challenge_method=S256&kc_idp_hint=stelliance-connect-dev'
    );
    expect(redirectUrl).toBe(
      'https://lemur-7.cloud-iam.com/auth/realms/plateforme-de-test-2/protocol/openid-connect/auth?client_id=account-console&redirect_uri=https%3A%2F%2Flemur-7.cloud-iam.com%2Fauth%2Frealms%2Fplateforme-de-test-2%2Faccount%2F%23%2F%26response_mode%3Dfragment%26response_type%3Dcode%26scope%3Dopenid%26code_challenge%3DAL0a6Zru52f0_NnRsgzAW1QVb_WEmkigipuiud4InvY%26code_challenge_method%3DS256%26kc_idp_hint%3Dstelliance-connect-dev'
    );
  });
});

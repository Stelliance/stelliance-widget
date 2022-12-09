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

    widgetConfigService.getWidgetsConfig().subscribe({
      next: (configs) => {
        expect(configs).toEqual(aConfig);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});

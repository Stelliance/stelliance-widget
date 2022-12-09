import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StellianceConnectWidgetConfigService } from '../services/stelliance-connect-widget-config.service';
import { StellianceConnectWidgetAppsComponent } from '../stelliance-connect-widget-apps/stelliance-connect-widget-apps.component';
import { StellianceConnectWidgetFixtures } from '../tests/fixtures/stelliance-connect-widget-config.fixtures';
import { StellianceConnectWidgetConfig } from './stelliance-connect-widget-config.model';
import { StellianceConnectWidgetComponent } from './stelliance-connect-widget.component';

class MockStellianceConnectWidgetConfigService {
  isLoggedIn = true;
  user = { name: 'Test User' };
}

describe('StellianceConnectWidgetComponent', () => {
  let component: StellianceConnectWidgetComponent;
  let fixture: ComponentFixture<StellianceConnectWidgetComponent>;

  let storeApplicationClicksSpy: jasmine.Spy<any>;
  let getItemSpy: jasmine.Spy<any>;
  let setItemSpy: jasmine.Spy<any>;

  const configService = jasmine.createSpyObj('StellianceConnectWidgetConfigService', ['getWidgetsConfig']);
  let getWidgetsConfigSpy: jasmine.Spy<any>;

  const STELLIANCE_CONNECT_LINKS_COUNTER = 'counter_stelliance_connect';
  const aConfig = StellianceConnectWidgetFixtures.aStellianceConnectWidgetConfig();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StellianceConnectWidgetComponent, StellianceConnectWidgetAppsComponent],
      providers: [
        StellianceConnectWidgetConfigService,
        {
          provide: StellianceConnectWidgetConfigService,
          useValue: configService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellianceConnectWidgetComponent);
    component = fixture.componentInstance;

    getWidgetsConfigSpy = configService.getWidgetsConfig.and.returnValue(of(aConfig));
    fixture.detectChanges();

    getItemSpy = spyOn(localStorage, 'getItem');
    setItemSpy = spyOn(localStorage, 'setItem');

    component.widgetApps = aConfig;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.widgetApps).toBeDefined();
  });

  it('ngOnInit method', () => {
    getItemSpy.and.returnValues('8', undefined, '1', '2');

    component.ngOnInit();

    expect(component.widgetAppsFavorites.length).toEqual(1);
    expect(component.widgetAppsFavorites[0].id).toEqual('id1');
    expect(component.widgetAppsFavorites[0].clickCount).toEqual(8);

    expect(component.widgetAppsNotFavorites.length).toEqual(3);
    expect(component.widgetAppsNotFavorites[0].id).toEqual('id4');
    expect(component.widgetAppsNotFavorites[0].clickCount).toEqual(2);

    expect(component.widgetAppsNotFavorites[2].id).toEqual('id2');
    expect(component.widgetAppsNotFavorites[2].clickCount).toEqual(0);
  });

  describe('navigateTo method', () => {
    beforeEach(() => {
      storeApplicationClicksSpy = spyOn(component as any, 'storeApplicationClicks');
    });

    it('should call storeApplicationClicks method with param', () => {
      component.navigateTo(component.widgetApps[0]);
      expect(storeApplicationClicksSpy).toHaveBeenCalledWith(component.widgetApps[0]);
    });
  });

  describe('sortByMostClickedApps method', () => {
    it('when a.clickCount > b.clickCount should return -1', () => {
      expect(
        (component as any).sortByMostClickedApps(
          { clickCount: 5 } as StellianceConnectWidgetConfig,
          { clickCount: 3 } as StellianceConnectWidgetConfig
        )
      ).toBe(-1);
    });
    it('when a.clickCount < b.clickCount should return 1', () => {
      expect(
        (component as any).sortByMostClickedApps(
          { clickCount: 1 } as StellianceConnectWidgetConfig,
          { clickCount: 3 } as StellianceConnectWidgetConfig
        )
      ).toBe(1);
    });
    it('when a.clickCount = b.clickCount should return 1', () => {
      expect(
        (component as any).sortByMostClickedApps(
          { clickCount: 1 } as StellianceConnectWidgetConfig,
          { clickCount: 1 } as StellianceConnectWidgetConfig
        )
      ).toBe(0);
    });
  });

  describe('storeApplicationClicks method', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.widgetApps = aConfig;
    });

    it('should set item.clickCount value with +1 each calls', () => {
      const initialCount = component.widgetApps[0].clickCount || 0;

      (component as any).storeApplicationClicks(component.widgetApps[0]);
      expect(component.widgetApps[0].clickCount).toBe(initialCount + 1);

      (component as any).storeApplicationClicks(component.widgetApps[0]);
      (component as any).storeApplicationClicks(component.widgetApps[0]);
      expect(component.widgetApps[0].clickCount).toBe(initialCount + 3);
    });

    it('should call localStorage with new value', () => {
      const initialCount = component.widgetApps[0].clickCount || 0;

      (component as any).storeApplicationClicks(component.widgetApps[0]);
      expect(setItemSpy).toHaveBeenCalledOnceWith(
        `${STELLIANCE_CONNECT_LINKS_COUNTER}_${component.widgetApps[0].id}`,
        (initialCount + 1).toString()
      );

      (component as any).storeApplicationClicks(component.widgetApps[0]);
      (component as any).storeApplicationClicks(component.widgetApps[0]);
      expect(setItemSpy).toHaveBeenCalledTimes(3);
    });
  });
});

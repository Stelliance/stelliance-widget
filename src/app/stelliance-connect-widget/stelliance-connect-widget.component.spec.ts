import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StellianceConnectWidgetConfigService } from '../services/stelliance-connect-widget-config.service';
import { StellianceConnectWidgetAppsComponent } from '../stelliance-connect-widget-apps/stelliance-connect-widget-apps.component';
import { StellianceConnectWidgetFixtures } from '../tests/fixtures/stelliance-connect-widget-config.fixtures';
import { StellianceConnectWidgetComponent } from './stelliance-connect-widget.component';

describe('StellianceConnectWidgetComponent', () => {
  let component: StellianceConnectWidgetComponent;
  let fixture: ComponentFixture<StellianceConnectWidgetComponent>;

  let storeApplicationClicksSpy: jasmine.Spy<any>;
  let getItemSpy: jasmine.Spy<any>;
  let setItemSpy: jasmine.Spy<any>;

  const STELLIANCE_CONNECT_LINKS_COUNTER = 'counter_stelliance_connect';
  const aConfig = StellianceConnectWidgetFixtures.aStellianceConnectWidgetConfig();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StellianceConnectWidgetComponent, StellianceConnectWidgetAppsComponent],
      providers: [
        StellianceConnectWidgetConfigService,
        {
          provide: StellianceConnectWidgetConfigService,
          useValue: {
            getWidgetsConfig: () => of(aConfig),
            encodeRedirectUrl: () => 'https://localhost',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellianceConnectWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    getItemSpy = spyOn(localStorage, 'getItem');
    setItemSpy = spyOn(localStorage, 'setItem');

    component.widgetsConfig = aConfig;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.widgetsConfig).toBeDefined();
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
      spyOn(window, 'open');
    });

    it('should call storeApplicationClicks method with param', () => {
      return component.navigateTo(component.widgetsConfig.applications[0]).then(() => {
        expect(storeApplicationClicksSpy).toHaveBeenCalledWith(component.widgetsConfig.applications[0]);
        expect(window.open).toHaveBeenCalled();
      });
    });
  });

  describe('storeApplicationClicks method', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.widgetsConfig = aConfig;
    });

    it('should set item.clickCount value with +1 each calls', () => {
      const initialCount = component.widgetsConfig.applications[0].clickCount || 0;

      (component as any).storeApplicationClicks(component.widgetsConfig.applications[0]);
      expect(component.widgetsConfig.applications[0].clickCount).toBe(initialCount + 1);

      (component as any).storeApplicationClicks(component.widgetsConfig.applications[0]);
      (component as any).storeApplicationClicks(component.widgetsConfig.applications[0]);
      expect(component.widgetsConfig.applications[0].clickCount).toBe(initialCount + 3);
    });

    it('should call localStorage with new value', () => {
      const initialCount = component.widgetsConfig.applications[0].clickCount || 0;

      (component as any).storeApplicationClicks(component.widgetsConfig.applications[0]);
      expect(setItemSpy).toHaveBeenCalledOnceWith(
        `${STELLIANCE_CONNECT_LINKS_COUNTER}_${component.widgetsConfig.applications[0].id}`,
        (initialCount + 1).toString()
      );

      (component as any).storeApplicationClicks(component.widgetsConfig.applications[0]);
      (component as any).storeApplicationClicks(component.widgetsConfig.applications[0]);
      expect(setItemSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('onClickDocument method', () => {
    it('should close component when user click anywhere on the page', () => {
      component.showWidgets = true;
      let event = {
        stopPropagation: () => true,
        path: [{ id: 'test' }],
      };
      (component as any).onClickDocument(event as any);
      expect(component.showWidgets).toBeFalsy();

      component.showWidgets = false;
      (component as any).onClickDocument(event as any);
      expect(component.showWidgets).toBeFalsy();

      component.showWidgets = true;
      event = {
        stopPropagation: () => true,
        path: [{ id: 'stellianceWidgetGridIcon' }],
      };
      expect(component.showWidgets).toBeTruthy();
    });
  });
});

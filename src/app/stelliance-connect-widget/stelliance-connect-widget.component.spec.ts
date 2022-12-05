import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StellianceConnectWidgetFixtures } from '../tests/fixtures/stelliance-connect-widget-config.fixtures';
import { Storage } from '../tests/storage.model';
import { StellianceConnectWidgetConfig } from './stelliance-connect-widget-config.model';

import { StellianceConnectWidgetComponent } from './stelliance-connect-widget.component';

describe('StellianceConnectWidgetComponent', () => {
  let component: StellianceConnectWidgetComponent;
  let fixture: ComponentFixture<StellianceConnectWidgetComponent>;

  let storeApplicationClicksSpy: jasmine.Spy<any>;
  let getItemSpy: jasmine.Spy<any>;
  let setItemSpy: jasmine.Spy<any>;
  let store: Storage = {};

  const STELLIANCE_CONNECT_LINKS_COUNTER = 'counter_stelliance_connect';
  const aConfig = StellianceConnectWidgetFixtures.aStellianceConnectWidgetConfig();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StellianceConnectWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellianceConnectWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // const mockLocalStorage = {
    //   getItem: (key: string): string | null => {
    //     return key in store ? store[key] : null;
    //   },
    //   setItem: (key: string, value: string) => {
    //     store[key] = `${value}`;
    //   },
    // };
    getItemSpy = spyOn(localStorage, 'getItem');

    setItemSpy = spyOn(localStorage, 'setItem');

    component.widgetApps = aConfig;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.widgetApps).toBeDefined();
  });

  it('ngOnInit method', () => {
    getItemSpy.and.returnValues('8', undefined, '1');

    component.ngOnInit();

    expect(component.widgetApps[0].id).toEqual('id1');
    expect(component.widgetApps[0].clickCount).toEqual(8);

    expect(component.widgetApps[1].id).toEqual('id3');
    expect(component.widgetApps[1].clickCount).toEqual(1);

    expect(component.widgetApps[2].id).toEqual('id2');
    expect(component.widgetApps[2].clickCount).toEqual(0);
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
    it('when a.clickCount is undefined and b.clickCount is undefined should return 0', () => {
      expect(
        (component as any).sortByMostClickedApps(
          { clickCount: undefined } as StellianceConnectWidgetConfig,
          { clickCount: undefined } as StellianceConnectWidgetConfig
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

    it('when item.clickCount is undefined, should set item.clickCount value with 1', () => {
      console.log('component.widgetApps', component.widgetApps);

      // fixture.componentRef
      // component.widgetApps = aStellianceConnectWidgetConfig;

      (component as any).storeApplicationClicks(component.widgetApps[1]);
      expect(component.widgetApps[1].clickCount).toBe(1);
    });
  });
});

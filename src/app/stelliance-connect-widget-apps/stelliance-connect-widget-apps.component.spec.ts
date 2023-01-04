import { async, TestBed } from '@angular/core/testing';
import { StellianceConnectWidgetAppsComponent } from './stelliance-connect-widget-apps.component';
import {
  DEFAULT_APP_LOGO_MAX_HEIGHT,
  DEFAULT_APP_LOGO_MAX_WIDTH,
} from '../stelliance-connect-widget/stelliance-connect-widget.constants';

describe('StellianceConnectWidgetAppsComponent', () => {
  let component: StellianceConnectWidgetAppsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StellianceConnectWidgetAppsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(StellianceConnectWidgetAppsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the app logo width and height to the default values', () => {
    expect(component.appLogoWidth).toBe(DEFAULT_APP_LOGO_MAX_WIDTH);
    expect(component.appLogoHeight).toBe(DEFAULT_APP_LOGO_MAX_HEIGHT);
  });

  it('should set the app logo width and height to the provided values', () => {
    component.appLogoWidth = '64';
    component.appLogoHeight = '64';

    expect(component.appLogoWidth).toBe('64');
    expect(component.appLogoHeight).toBe('64');
  });
});

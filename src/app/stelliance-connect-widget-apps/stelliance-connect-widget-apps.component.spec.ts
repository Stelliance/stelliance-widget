import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DEFAULT_APP_LOGO_MAX_HEIGHT,
  DEFAULT_APP_LOGO_MAX_WIDTH,
} from '../stelliance-connect-widget/stelliance-connect-widget.constants';

import { StellianceConnectWidgetAppsComponent } from './stelliance-connect-widget-apps.component';

describe('StellianceConnectWidgetAppsComponent', () => {
  let component: StellianceConnectWidgetAppsComponent;
  let fixture: ComponentFixture<StellianceConnectWidgetAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StellianceConnectWidgetAppsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellianceConnectWidgetAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.appLogoWidth).toEqual(DEFAULT_APP_LOGO_MAX_WIDTH);
    expect(component.appLogoHeight).toEqual(DEFAULT_APP_LOGO_MAX_HEIGHT);
  });
});

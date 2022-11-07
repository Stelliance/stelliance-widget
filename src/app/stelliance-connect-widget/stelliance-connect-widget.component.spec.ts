import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StellianceConnectWidgetComponent } from './stelliance-connect-widget.component';

describe('StellianceConnectWidgetComponent', () => {
  let component: StellianceConnectWidgetComponent;
  let fixture: ComponentFixture<StellianceConnectWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StellianceConnectWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StellianceConnectWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.widgetApps).toBeDefined();
  });
});

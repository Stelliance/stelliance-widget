import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { StellianceConnectWidgetComponent } from './stelliance-connect-widget/stelliance-connect-widget.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [StellianceConnectWidgetComponent],
  imports: [BrowserModule],
  providers: [],
})
export class AppModule {
  constructor(injector: Injector) {
    const widgetCustomElement = createCustomElement(StellianceConnectWidgetComponent, { injector });
    customElements.define('stc-app-widget', widgetCustomElement);
  }
  ngDoBootstrap(appRef: ApplicationRef) {
    if (!environment.production) {
      appRef.bootstrap(StellianceConnectWidgetComponent, 'stelliance-connect-widget');
    }
  }
}

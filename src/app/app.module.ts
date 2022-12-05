import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { StellianceConnectWidgetComponent } from './stelliance-connect-widget/stelliance-connect-widget.component';
import { OrderByPipe } from './utils/order-by-pipe';

@NgModule({
  declarations: [StellianceConnectWidgetComponent, OrderByPipe],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [StellianceConnectWidgetComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    const widgetCustomElement = createCustomElement(StellianceConnectWidgetComponent, { injector });
    customElements.define('stc-app-widget', widgetCustomElement);
  }
  ngDoBootstrap() {}
}

export interface StellianceConnectWidgetApplicationConfig {
  id: string;
  logo: string;
  name: string;
  idpName: string;
  clickCount: number;
  redirectUri: string;
}

export interface StellianceConnectWidgetConfig {
  stelliance: { baseUrl: string };
  applications: StellianceConnectWidgetApplicationConfig[];
}

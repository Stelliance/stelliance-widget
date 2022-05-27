import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './stelliance-connect-widget.component.html',
  styleUrls: ['./stelliance-connect-widget.component.css']
})
export class StellianceConnectWidgetComponent implements OnInit {

  public widgetApps = [
    {
      id: 'hiveo',
      logo: 'https://lh3.googleusercontent.com/JLXPNxeFb6nYW_fQRE6JT2N7OU4GLytGn5d2i5ljBw-B2N6C8TZ9VN2PXLhLkeLOefMEkdz8vYliRVm4Y7y4',
      name: 'Hiveo'
    },
    {
      id: 'conformitee',
      logo: 'https://www.conformitee.fr/wp-content/uploads/2020/05/Logo_Conformitee_Horizontal_M.png',
      name: 'Conformitee'
    },
    {
      id: 'viaco',
      logo: 'https://c.smartrecruiters.com/sr-careersite-image-prod-dc5/5ed53051e3261858ae571e66/0549d054-280d-44de-86d1-0f9b9635f6cf?r=s3-eu-central-1',
      name: 'Viaco'
    },
    {
      id: 'sis',
      logo: 'https://uploads-ssl.webflow.com/602be30475e9ea3cc47ec886/60f7dec17298039a8036b7cc_images-24-06-2021-09-33-665.png',
      name: 'Sis ID'
    }
  ];

  ngOnInit(): void {
    console.log('stelliance widget is initialized');
  }

}

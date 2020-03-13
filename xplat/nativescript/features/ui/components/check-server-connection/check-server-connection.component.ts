import { Component, OnInit } from '@angular/core';
import { FingerprintAuth } from 'nativescript-fingerprint-auth';
import { BaseComponent } from '@erp/core';
import { _globalServerRootUri, GetServerTimeGQL, GetServerTimeQuery, Message } from '@erpjs/api-interfaces';
import { RouterExtensions } from 'nativescript-angular/router';
import { DataLoadingService } from '@erp/core/services/data.loading.service';
import { MobileAuthService } from '@erp/nativescript/core';
import { HttpClient } from '@angular/common/http';

const appSettings = require('tns-core-modules/application-settings');

@Component({
  moduleId: module.id,
  selector: 'xpl-check-server-connection',
  templateUrl: './check-server-connection.component.html'
})
export class CheckServerConnectionComponent extends BaseComponent implements OnInit {
  attemptCount = 0;
  details = '';
  private fingerprintAuth: FingerprintAuth;

  constructor(
    private http: HttpClient,
    private getServerTimeGQL: GetServerTimeGQL,
    private routerExtensions: RouterExtensions,
    private dataLoadingService: DataLoadingService,
    private mobileAuthService: MobileAuthService,
  ) {
    super();
    this.fingerprintAuth = new FingerprintAuth();
  }
  async ngOnInit(): Promise<void> {
    this.attemptCount = 0;
    let loaded = false;
    while (!loaded) {
      try {
        this.attemptCount++;
        const msg = this.http.get<Message>(`${_globalServerRootUri}/api/hello`)
        loaded = true;
        console.log('*** got server response', msg);
      } catch (e) {
        console.log('*** getting server response failed', e);
        if (this.attemptCount > 10) {
          this.details = `${e.name} - ${e.message}`
        }
      }
    }

    try {
      const extractor = (x: GetServerTimeQuery) => x.now;
      const serverTime = await this.dataLoadingService.loadGQL(this.getServerTimeGQL, extractor);
      console.log('*** got serverTime', serverTime);
      // now we know we are authenticated so let's check the fingerprint for sure
      const isFingerprintEnabled = appSettings.getBoolean('fingerprintEnabled', false);
      if(isFingerprintEnabled) {
        this.fingerprintAuth.available().then(available => {
          this.fingerprintAuth.verifyFingerprintWithCustomFallback({
            fallbackMessage: 'Enter Your Device Password',
            message: 'Authenticate via a Fingerprint'
          }).then(() => {
            console.log('Fingerprint was OK');
            this.routerExtensions.navigate(['']);
          }, () => {
            throw new Error('The fingerprint was not valid');
          });
        });
      } else this.routerExtensions.navigate(['']);
    }
    catch(e) {
      await this.mobileAuthService.logout();
      await this.mobileAuthService.login();
    }
  }
}

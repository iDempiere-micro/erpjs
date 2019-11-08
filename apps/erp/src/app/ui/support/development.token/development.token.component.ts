import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'erp-development-token',
  template: `
      <a  (click)="copyToClipboard()" role="tooltip" aria-haspopup="true" class="tooltip tooltip-lg">
          <clr-icon shape="info-circle" size="24"></clr-icon>
          <span class="tooltip-content">{{token | async }}</span>
      </a>
      <input type="text" style="display: none;" value="{{token | async }}" #tokenInput>  `,
  styles: []
})
export class DevelopmentTokenComponent implements OnInit {
  public token: Observable<string>;
  @ViewChild('tokenInput', {static: false}) tokenInput:ElementRef;

  constructor(private authService: AuthService,) { }

  async ngOnInit() {
    this.token = await this.authService.getTokenSilently$();
  }

  copyToClipboard() {
    const copyText = this.tokenInput.nativeElement;

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyText.value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}

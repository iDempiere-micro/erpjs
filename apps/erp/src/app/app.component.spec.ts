import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from './ui/ui.module';
import { AuthService } from './auth/auth.service';
import { ClarityModule } from '@clr/angular';
import { DataLoadingService } from '@erp/core';

const mockAuthService = {};
export const mockAuthServiceProvider = { provide: AuthService, useValue: mockAuthService };
const mockDataLoadingService = {setLoadingIndicator: (x) => {}};
export const mockDataLoadingServiceProvider = { provide: DataLoadingService, useValue: mockDataLoadingService };

describe('AppComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, RouterTestingModule, UiModule, ClarityModule],
      providers: [mockAuthServiceProvider, mockDataLoadingServiceProvider]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

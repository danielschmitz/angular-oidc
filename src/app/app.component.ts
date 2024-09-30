import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment.development';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-oidc';
  state = signal<string>('');

  authCodeFlowConfig: AuthConfig = {
    issuer: environment.auth.issuer,
    redirectUri: window.location.origin,
    clientId: environment.auth.clientId,
    dummyClientSecret: environment.auth.clientSecret,
    responseType: environment.auth.responseType,
    scope: environment.auth.scope,
    showDebugInformation: !environment.production,
    requireHttps: environment.auth.requireHttps,
  };

  constructor(public oauthService: OAuthService) {}

  ngOnInit(): void {
    console.log('onInit', this.authCodeFlowConfig)
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.setStorage(environment.auth.storage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    
    setTimeout(() => {
      if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
        const stateValue = this.oauthService.state || '';
        this.state.set(stateValue);
        console.log('State recuperado:', stateValue);
      }  
    }, 1000);
   
  }

  login(): void {
    console.log('login', this.state());
    this.oauthService.initCodeFlow(this.state());
  }

  logout(): void {
    console.log('logout');
    this.oauthService.logOut();
  }

  refresh(): void {
    console.log('refresh');
    this.oauthService.refreshToken();
  }

  getToken(): string {
    return this.oauthService.getAccessToken();
  }

  getIdToken(): string {
    return this.oauthService.getIdToken();
  }

  getUserInfo(): any {
    return this.oauthService.getIdentityClaims();
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getStorage() {
    return environment.auth.storage == localStorage ? 'localStorage' : 'sessionStorage';
    }
}

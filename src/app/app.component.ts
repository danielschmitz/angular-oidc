import { Component, OnInit } from '@angular/core';
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
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    console.log('login');
    this.oauthService.initCodeFlow();
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
}

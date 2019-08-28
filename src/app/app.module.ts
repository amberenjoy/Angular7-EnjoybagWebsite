import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { Ng6SocialButtonModule, SocialServiceConfig } from 'ng6-social-button';

// Configs
// export function getAuthServiceConfigs() {
//   const config = new SocialServiceConfig()
//     .addFacebook('1032790253567506');
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, PagesModule, BrowserAnimationsModule
  ],
  providers: [
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

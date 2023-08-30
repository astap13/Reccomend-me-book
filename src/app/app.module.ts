import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecommendComponent } from './recommend/recommend.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, RecommendComponent],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, HttpClientModule],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}

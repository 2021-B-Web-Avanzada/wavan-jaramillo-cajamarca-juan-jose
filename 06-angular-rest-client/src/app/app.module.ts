import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbActionsModule,
  NbMenuModule,
  NbDialogModule,
  NbToastrModule,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NbToastrModule.forRoot({
      preventDuplicates: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

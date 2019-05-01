import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { isDevMode, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { Level, LoggerModule } from "@ngx-toolkit/logger";

const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    LoggerModule.forRoot(LOG_LEVEL)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

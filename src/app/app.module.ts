import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { isDevMode, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { Level, LoggerModule } from "@ngx-toolkit/logger";
import { GestureConfig } from "@angular/material";
import { StoreModule } from "@ngrx/store";
import * as fromFeature from "./session/store/reducer/reducer";
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SessionLayoutComponent } from './layout/session-layout/session-layout.component';
import { SharedComponentsModule } from "./shared/components/shared-components.module";

const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    SessionLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    SharedComponentsModule,
    CoreModule,
    LoggerModule.forRoot(LOG_LEVEL),
    StoreModule.forFeature('auth', fromFeature.reducers),
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

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
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./session/store/reducer/reducer";
import { AuthEffects } from "./session/store/effect/auth.effects";
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SessionLayoutComponent } from './layout/session-layout/session-layout.component';
import { SharedComponentsModule } from "./shared/components/shared-components.module";

const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('[STORE] action ', action.type);

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<any>[] = [debug];

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
    StoreModule.forRoot(reducers, environment.production == true ? {} : {metaReducers}),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

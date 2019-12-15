import { NgModule } from "@angular/core";
import { NavigationModule } from "./navigation/navigation.module";
import { SearchModule } from "./search/search.module";
import { RefreshTokenInterceptor } from "./auth/refresh-token.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { reducers } from "../session/store/reducer/reducer";
import { environment } from "../../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "../session/store/effect/auth.effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('[STORE] action ', action.type);
    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  imports: [
    NavigationModule,
    SearchModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, environment.production == true ? {} : {metaReducers}),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  exports: [
    NavigationModule,
    SearchModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

}

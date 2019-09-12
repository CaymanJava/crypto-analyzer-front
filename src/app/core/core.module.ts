import { NgModule } from "@angular/core";
import { NavigationModule } from "./navigation/navigation.module";
import { SearchModule } from "./search/search.module";
import { RefreshTokenInterceptor } from "./auth/refresh-token.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    NavigationModule,
    SearchModule,
    HttpClientModule
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

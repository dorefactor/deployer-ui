import { NgModule } from '@angular/core';
import { KeyValuePairComponent } from '../component/key-value-pair/key-value-pair.component';
import { AngularMaterialModule } from 'src/app/angular-material/module/angular-material.module';
import { TuplaThreeComponent } from '../component/tupla-three/tupla-three.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentTypeInterceptor } from '../interceptor/content-type.interceptor';
import { ShowHideTextDirective } from '../directive/show-hide-text.directive';

@NgModule({
  declarations: [
    KeyValuePairComponent,
    TuplaThreeComponent,
    ShowHideTextDirective
  ],
  imports: [
    AngularMaterialModule,
    FontAwesomeModule
  ],
  exports: [
    KeyValuePairComponent,
    ShowHideTextDirective
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ContentTypeInterceptor,
    multi: true
  }]
})
export class SharedModule { }

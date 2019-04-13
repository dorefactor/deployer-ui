import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';
import { AngularMaterialModule } from './angular-material/module/angular-material.module';
import { KeyValuePairComponent } from './key-value-pair/key-value-pair.component';
import { TuplaThreeComponent } from './tupla-three/tupla-three.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    ConfigurationFormComponent,
    KeyValuePairComponent,
    TuplaThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

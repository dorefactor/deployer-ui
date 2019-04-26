import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from './angular-material/module/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/module/shared.module';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DeploymentModule } from './deployment/module/deployment.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    FontAwesomeModule,
    SharedModule,
    DeploymentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas);
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';
import { EnvironmentVariablesComponent } from './environment-variables/environment-variables.component';

const routes: Routes = [
  {
    path: 'configuration', component: ConfigurationFormComponent
  },
  {
    path: 'env', component: EnvironmentVariablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

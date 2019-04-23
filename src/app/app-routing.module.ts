import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';
import { DeploymentFormComponent } from './deployment-form/deployment-form.component';

const routes: Routes = [
  {
    path: 'configuration', component: ConfigurationFormComponent
  },
  {
    path: 'deployment', component: DeploymentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

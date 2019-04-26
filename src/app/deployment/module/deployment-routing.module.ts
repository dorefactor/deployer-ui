import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ApplicationConfigurationFormComponent } from '../component/application-configuration-form/application-configuration-form.component';
import { DeploymentTemplateConfigurationFormComponent } from '../component/deployment-template-configuration-form/deployment-template-configuration-form.component';

const DEPLOYMENT_ROUTES: Routes = [
  {
    path: 'configuration', component: HomeComponent, children: [
      {
        path: 'applications',
        component: ApplicationConfigurationFormComponent
      },
      {
        path: 'deployment-templates',
        component: DeploymentTemplateConfigurationFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(DEPLOYMENT_ROUTES)
  ],
  exports: [RouterModule]
})
export class DeploymentRoutingModule { }

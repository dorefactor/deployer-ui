import { NgModule } from '@angular/core';
import { DeploymentRoutingModule } from './deployment-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/module/angular-material.module';
import { ApplicationConfigurationFormComponent } from '../component/application-configuration-form/application-configuration-form.component';
import { DeploymentTemplateConfigurationFormComponent } from '../component/deployment-template-configuration-form/deployment-template-configuration-form.component';
import { HostSetupComponent } from '../component/host-setup/host-setup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/module/shared.module';

@NgModule({
  declarations: [
    ApplicationConfigurationFormComponent,
    DeploymentTemplateConfigurationFormComponent,
    HostSetupComponent
  ],
  imports: [
    AngularMaterialModule,
    FontAwesomeModule,
    NgSelectModule,
    SharedModule,
    DeploymentRoutingModule
  ]
})
export class DeploymentModule { }

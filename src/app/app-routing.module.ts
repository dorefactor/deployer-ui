import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';

const routes: Routes = [
  {
    path: 'configuration', component: ConfigurationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

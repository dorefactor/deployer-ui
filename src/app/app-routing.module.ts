import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecificationsComponent } from './specifications/specifications.component';

const routes: Routes = [
  {
    path: 'specifications', component: SpecificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

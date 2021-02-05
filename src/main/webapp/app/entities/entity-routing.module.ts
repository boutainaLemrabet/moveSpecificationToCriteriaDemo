import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee-routing.module').then(m => m.EmployeeRoutingModule),
      },
      {
        path: 'employee-skill',
        loadChildren: () => import('./employee-skill/employee-skill-routing.module').then(m => m.EmployeeSkillRoutingModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

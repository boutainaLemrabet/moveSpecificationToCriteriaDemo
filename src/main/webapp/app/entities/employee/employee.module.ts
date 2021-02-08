import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [EmployeeComponent, EmployeeDetailComponent, EmployeeUpdateComponent],
  exports: [EmployeeDetailComponent, EmployeeUpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeModule {}

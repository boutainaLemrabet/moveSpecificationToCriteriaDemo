import { IEmployee } from 'app/shared/model/employee.model';

export interface IEmployeeSkill {
  name?: string;
  level?: number;
  employee?: IEmployee;
  teacher?: IEmployee;
}

export class EmployeeSkill implements IEmployeeSkill {
  constructor(public name?: string, public level?: number, public employee?: IEmployee, public teacher?: IEmployee) {}
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';
import { FilterMetadata, MessageService } from 'primeng/api';
import { IEmployeeSkill } from '../../shared/model/employee-skill.model';
import { EmployeeSkillService } from './employee-skill.service';

import { ITEMS_PER_PAGE } from '../../core/config/pagination.constants';
import {
  lazyLoadEventToServerQueryParams,
  lazyLoadEventToRouterQueryParams,
  fillTableFromQueryParams,
} from '../../core/request/request-util';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { IEmployee } from '../../shared/model/employee.model';
import { EmployeeService } from '../../entities/employee/employee.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'jhi-employee-skill',
  templateUrl: './employee-skill.component.html',
})
export class EmployeeSkillComponent implements OnInit, OnDestroy {
  employeeSkills?: IEmployeeSkill[];
  eventSubscriber?: Subscription;
  employeeOptions: IEmployee[] | null = null;
  teacherOptions: IEmployee[] | null = null;

  totalItems?: number;
  itemsPerPage!: number;
  loading!: boolean;

  private filtersDetails: { [_: string]: { matchMode?: string; flatten?: (_: string[]) => string; unflatten?: (_: string) => any } } = {
    name: { matchMode: 'contains' },
    level: { matchMode: 'equals', unflatten: (x: string) => +x },
    ['employee.username']: { matchMode: 'in', flatten: a => a.filter((x: string) => x).join(','), unflatten: (a: string) => a.split(',') },
    ['teacher.username']: { matchMode: 'in', flatten: a => a.filter((x: string) => x).join(','), unflatten: (a: string) => a.split(',') },
  };

  @ViewChild('employeeSkillTable', { static: true })
  employeeSkillTable!: Table;

  constructor(
    protected employeeSkillService: EmployeeSkillService,
    protected employeeService: EmployeeService,
    protected messageService: MessageService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected confirmationService: ConfirmationService,
    protected translateService: TranslateService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.loading = true;
  }

  ngOnInit(): void {
    this.registerChangeInEmployeeSkills();
    this.activatedRoute.queryParams
      .pipe(
        tap(queryParams => fillTableFromQueryParams(this.employeeSkillTable, queryParams, this.filtersDetails)),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.employeeSkillService.query(lazyLoadEventToServerQueryParams(this.employeeSkillTable.createLazyLoadMetadata()))
        ),
        filter((res: HttpResponse<IEmployeeSkill[]>) => res.ok)
      )
      .subscribe(
        (res: HttpResponse<IEmployeeSkill[]>) => {
          this.paginateEmployeeSkills(res.body!, res.headers);
          this.loading = false;
        },
        (res: HttpErrorResponse) => {
          this.onError(res.message);
          this.loading = false;
        }
      );
  }

  get filters(): { [s: string]: FilterMetadata } {
    return this.employeeSkillTable.filters as { [s: string]: FilterMetadata };
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  onLazyLoadEvent(event: LazyLoadEvent): void {
    const queryParams = lazyLoadEventToRouterQueryParams(event, this.filtersDetails);
    this.router.navigate(['/employee-skill'], { queryParams });
  }

  filter(value: any, field: string): void {
    this.employeeSkillTable.filter(value, field, this.filtersDetails[field].matchMode!);
  }

  delete(name: string, employeeUsername: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('entity.delete.title'),
      message: this.translateService.instant('compositekeyApp.employeeSkill.delete.question', { id: `${name} , ${employeeUsername}` }),
      accept: () => {
        this.employeeSkillService.delete(name, employeeUsername).subscribe(() => {
          this.eventManager.broadcast({
            name: 'employeeSkillListModification',
            content: 'Deleted an employeeSkill',
          });
        });
      },
    });
  }

  onEmployeeLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'fullname.contains'))
      .subscribe(res => (this.employeeOptions = res.body));
  }

  onTeacherLazyLoadEvent(event: LazyLoadEvent): void {
    this.employeeService
      .query(lazyLoadEventToServerQueryParams(event, 'fullname.contains'))
      .subscribe(res => (this.teacherOptions = res.body));
  }

  trackId(index: number, item: IEmployeeSkill): string {
    return `${item.name!},${item.employee!.username!}`;
  }

  registerChangeInEmployeeSkills(): void {
    this.eventSubscriber = this.eventManager.subscribe('employeeSkillListModification', () =>
      this.router.navigate(['/employee-skill'], { queryParams: { r: Date.now() } })
    );
  }

  protected paginateEmployeeSkills(data: IEmployeeSkill[], headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.employeeSkills = data;
  }

  protected onError(errorMessage: string): void {
    this.messageService.add({ severity: 'error', summary: errorMessage });
  }
}

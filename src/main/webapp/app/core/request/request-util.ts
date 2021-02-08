import { HttpParams } from '@angular/common/http';
import { FilterMetadata, LazyLoadEvent } from 'primeng/api';
import { ITEMS_PER_PAGE } from '../config/pagination.constants';
import { flatten, unflatten } from 'flat';
import { Params } from '@angular/router';
import { Table } from 'primeng/table';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};

export const lazyLoadEventToServerQueryParams = (event?: LazyLoadEvent, globalFilter?: string): { [_: string]: any } => {
  const params: { [index: string]: any } = {};
  if (event) {
    if (event.filters) {
      for (const filterField of Object.keys(event.filters)) {
        const matchMode = event.filters[filterField].matchMode;
        if (matchMode === 'between') {
          if (event.filters[filterField].value[0]) {
            params[filterField + '.greaterThanOrEqual'] = event.filters[filterField].value[0];
          }
          if (event.filters[filterField].value[1]) {
            params[filterField + '.lessThanOrEqual'] = event.filters[filterField].value[1];
          }
        } else {
          // make params[`${filterField}${matchMode?`.${matchMode}`:''}`] readable
          params[`${filterField}${matchMode ? `.${matchMode}` : ''}`] = event.filters[filterField].value;
        }
      }
    }
    if (event.globalFilter && globalFilter) {
      params[globalFilter] = event.globalFilter;
    }
    if (event.multiSortMeta) {
      params['sort'] = event.multiSortMeta.map(s => s.field + (s.order === -1 ? ',desc' : ',asc'));
    }
    params['page'] = (event.first ?? 0) / (event.rows ?? ITEMS_PER_PAGE);
    params['size'] = event.rows ?? ITEMS_PER_PAGE;
  } else {
    params['size'] = ITEMS_PER_PAGE;
  }
  return params;
};

export const fillTableFromQueryParams = (
  table: Table,
  queryParams: Params,
  filtersDetails: { [_: string]: { matchMode?: string; unflatten?: (_: any) => any } }
): void => {
  const params: any = unflatten(queryParams);
  table.first = +queryParams.first || 0;
  table.multiSortMeta = (params['msm'] || []).map((sm: any) => ({ field: sm.field, order: +sm.order }));
  const filters: { [index: string]: any } = {};
  if (params['f']) {
    Object.entries(flatten(params['f'], { safe: true })).forEach(
      ([field, value]) =>
        (filters[field] = {
          value: (filtersDetails[field].unflatten && filtersDetails[field].unflatten!(value)) || value,
          matchMode: filtersDetails[field].matchMode,
        })
    );
  }
  table.filters = filters;
};

export const lazyLoadEventToRouterQueryParams = (
  event: LazyLoadEvent,
  filtersDetails: { [_: string]: { matchMode?: string; flatten?: (_: any) => any } }
): Params => {
  const queryParams: { [_: string]: any } = {};
  if (event.first) {
    queryParams['first'] = event.first;
  }
  if (event.multiSortMeta?.length) {
    queryParams['msm'] = event.multiSortMeta;
  }
  if (event.filters) {
    Object.entries(event.filters).forEach(([field, filter]: [string, FilterMetadata]) => {
      let filterValue = filter.value;
      if (filterValue && filtersDetails[field].flatten) {
        filterValue = filtersDetails[field].flatten!(filterValue);
      }
      queryParams[`f.${field}`] = filterValue;
    });
  }
  return flatten(queryParams);
};

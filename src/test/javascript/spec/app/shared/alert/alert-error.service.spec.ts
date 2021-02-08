import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AlertErrorService } from 'app/shared/alert/alert-error.service';
import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Component Tests', () => {
  describe('Alert Error Component', () => {
    let service: AlertErrorService;
    let messageService: MessageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [AlertErrorService, MessageService],
      });
      service = TestBed.get(AlertErrorService);
      messageService = TestBed.get(MessageService);
      spyOn(messageService, 'add');
    });

    describe('Error Handling', () => {
      it('Should display an alert on status 0', () => {
        // GIVEN
        service.displayError(<HttpErrorResponse>{ status: 0 });
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(1);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'error.server.not.reachable' });
      });

      it('Should display an alert on status 404', () => {
        // GIVEN
        service.displayError(<HttpErrorResponse>{ status: 404 });
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(1);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'error.url.not.found' });
      });

      it('Should display an alert on generic error', () => {
        // GIVEN
        service.displayError(<HttpErrorResponse>{ status: 111, error: { message: 'Error Message' } });
        service.displayError(<HttpErrorResponse>{ status: 111, error: 'Second Error Message' });
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(2);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error Message' });
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Second Error Message' });
      });

      it('Should display an alert on status 400 for generic error', () => {
        // GIVEN
        const response = new HttpErrorResponse({
          url: 'http://localhost:8080/api/foos',
          headers: new HttpHeaders(),
          status: 400,
          statusText: 'Bad Request',
          error: {
            type: 'https://www.jhipster.tech/problem/constraint-violation',
            title: 'Bad Request',
            status: 400,
            path: '/api/foos',
            message: 'error.validation',
          },
        });
        service.displayError(response);
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(1);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'error.validation' });
      });

      it('Should display an alert on status 400 for generic error without message', () => {
        // GIVEN
        const response = new HttpErrorResponse({
          url: 'http://localhost:8080/api/foos',
          headers: new HttpHeaders(),
          status: 400,
          error: 'Bad Request',
        });
        service.displayError(response);
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(1);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Bad Request' });
      });

      it('Should display an alert on status 400 for invalid parameters', () => {
        // GIVEN
        const response = new HttpErrorResponse({
          url: 'http://localhost:8080/api/foos',
          headers: new HttpHeaders(),
          status: 400,
          statusText: 'Bad Request',
          error: {
            type: 'https://www.jhipster.tech/problem/constraint-violation',
            title: 'Method argument not valid',
            status: 400,
            path: '/api/foos',
            message: 'error.validation',
            fieldErrors: [{ objectName: 'foo', field: 'minField', message: 'Min' }],
          },
        });
        service.displayError(response);
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(1);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'error.Size' });
      });

      it('Should display an alert on status 400 for error headers', () => {
        // GIVEN
        const response = new HttpErrorResponse({
          url: 'http://localhost:8080/api/foos',
          headers: new HttpHeaders().append('app-error', 'Error Message').append('app-params', 'foo'),
          status: 400,
          statusText: 'Bad Request',
          error: {
            status: 400,
            message: 'error.validation',
          },
        });
        service.displayError(response);
        // THEN
        expect(messageService.add).toHaveBeenCalledTimes(1);
        expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error Message' });
      });
    });
  });
});

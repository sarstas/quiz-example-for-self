import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from "@app/shared/rest/rest.service";
import { environment } from "@environments/environment";
import { Question } from "@app/home/entietis/question";

// TODO you can create common RestService with map response.data and handle errors aswell
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  get api() {
    return 'api/questions/';
  }

  constructor(
    private _http: HttpClient,
    private _rest: RestService
  ) {
  }

  getAll(): Observable<Question[]> {
    return this._http.get(this.api).pipe(
      tap(console.info),
      map((response: IResponse<Question[]>) => response.data)
    );
  }
  getQuestion(): Observable<any> {
    return this._rest.restGET(`${environment.apiUrl}questions`)
  }

  find(id: number): Observable<IQuestion> {
    return this._http.get(`${environment.apiUrl}questions/${id}`).pipe(
      map((response: IResponse<IQuestion>) => response.data)
    );
  }

  remove(id: number): Observable<void> {
    return this._rest.restDELETE(`${environment.apiUrl}questions/${id}`);
  }

  create(body: any): Observable<void> {
    return this._http.post<void>(this.api, body);
  }

  edit(id: number, body): Observable<void> {
    return this._http.put<void>(`${this.api}${id}`, body);
  }
}

export interface IQuestion {
  id: number;
  question: string;
  answer: string;
}

export enum ResponseStatus {
  Success = 'success',
  Fail = 'fail',
}

export interface IResponse<T = any> {
  data: T;
  message: string;
  status: ResponseStatus;
}

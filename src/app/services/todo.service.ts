import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from '../lista/lista';

@Injectable({
  providedIn: 'root'
})

export class ToDoService{

  urlPadrao = '/api';
  urlTodo = '/todo';
  urlAdd = '/add';
  urlAll = '/all';
  urlDelete = '/delete';

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Lista[]>
  {
    return this.httpClient.get<Lista[]>(this.urlPadrao + this.urlTodo + this.urlAll);
  }

  getUndone(): Observable<Lista[]>
  {
    return this.httpClient.get<Lista[]>(this.urlPadrao + this.urlTodo);
  }

  done(id: number)
  {
    return this.httpClient.post<Lista>(this.urlPadrao + this.urlTodo + this.urlAdd + '/' + id.toString(), {});
  } 

  add(todo: string)
  {
    return this.httpClient.post<Lista>(this.urlPadrao + this.urlTodo + this.urlAdd, {"done": false, "todo": todo});
  }

  delete(id: number)
  {
    return this.httpClient.delete(this.urlPadrao + this.urlTodo + this.urlDelete + '/' + id.toString());
  }
  
}
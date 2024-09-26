import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  targetUrl:string='http://localhost:8080/api/v1/todos';

  constructor(private _http:HttpClient) { }

  addTodo(data: any): Observable<any>{
    return this._http.post(this.targetUrl, data);
  }

  getAllTodos(): Observable<any>{
    return this._http.get(this.targetUrl);
  }

  updateTodo(id:number, data: any): Observable<any>{
    let user =data['user'];
    return this._http.put(this.targetUrl+'/user/'+user+'/'+id, data);
  }

  deleteTodo(id: number): Observable<any>{
    return this._http.delete(this.targetUrl+'/'+id);
  }
}

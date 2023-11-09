import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consumer } from './model/consumer';
import { Cons, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

  getConsumers(search:string):Observable<Consumer[]>{
    if(search){
      return this.http.get<Consumer[]>(`/api/consumers?q=${search}`);
    }else{
      return this.http.get<Consumer[]>('/api/consumers');
    }
  }

  getConsumer(id:string):Observable<Consumer>{
    return this.http.get<Consumer>(`/api/consumers/${id}`);
  }

  save(consumer:Consumer):Observable<Consumer>{
    if(consumer.id){
      return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer);
    }else{
      return this.http.post<Consumer>('/api/consumers', consumer);
    }
  }

  delete (id:number):Observable<object>{
    return this.http.delete<any>(`/api/consumers/${id}`);
  }
}

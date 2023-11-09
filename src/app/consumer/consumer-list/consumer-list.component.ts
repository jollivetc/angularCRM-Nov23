import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Observable, Subscription } from 'rxjs';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit, OnDestroy{

  consumersObs?:Observable<Consumer[]>;
  
  private subs:Subscription[]=[];
  search:string='';
  constructor(private consumerService:ConsumerService){}
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit(): void {
    this.doSearch();
  }
  doSearch():void{
    this.consumersObs = this.consumerService.getConsumers(this.search);
  }

  delete(id:number):void{
    this.subs.push(this.consumerService.delete(id).subscribe({
      next:(q:object)=>this.doSearch(),
      error:(error:Error)=>alert(error.message),
      complete: ()=>{}
    }));
  }
}

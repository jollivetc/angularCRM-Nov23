import { Component, OnDestroy } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { Observable, Subscription, catchError, map, of, take } from 'rxjs';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  subs:Subscription[]=[];
  obs? : Observable<number>;
  constructor(private demoObs:DemoObservableService){}

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }

  testObs():void{
    const subscriber = {
      next: (data:number)=> console.log(data),
      error: (error:Error)=>console.error(error),
      complete:()=>console.log('complete')
    };
    console.log('before');
    const sub = this.demoObs.getObservable().pipe(
        map(data=>data*10)
    ).subscribe(subscriber);
    console.log('after');
    this.subs.push(sub);
  }

  testAsyncObs(){
    this.obs= this.demoObs.getObservable().pipe(
      catchError((error)=>{
        console.log(error);
        return of(999999)
      })
    );
  }
}

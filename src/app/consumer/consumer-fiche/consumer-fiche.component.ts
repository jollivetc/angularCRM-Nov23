import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnDestroy, OnInit{

  consumerForm:FormGroup;
  private subs:Subscription[]=[];
  private consumer?:Consumer;

  constructor(private consumerService: ConsumerService, private router:Router, private route:ActivatedRoute){
    this.consumerForm = new FormGroup({
      civility: new FormControl('',[Validators.required]),
      firstname:new FormControl('',[Validators.required]),
      lastname:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required])
    });
  }
  ngOnInit(): void {
    const consumerId = this.route.snapshot.paramMap.get('id');
    if(consumerId){
      this.subs.push(this.consumerService.getConsumer(consumerId).subscribe({
        next:(consumer:Consumer)=> {
          this.consumer = consumer;
          this.consumerForm.patchValue(consumer);
        },
        error: (error:Error)=> alert(error.message),
        complete: ()=>{}
      }));
    }
    console.log(consumerId)
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub=> sub.unsubscribe());
  }

  onSubmit():void{
    const fusion = {...this.consumer, ...this.consumerForm.value};
    this.subs.push(this.consumerService.save(fusion).subscribe({
      next: (data:Consumer)=>{},
      error: (error:Error)=> alert(error.message),
      complete:()=>this.router.navigateByUrl('/consumers')
    }));
  }
}

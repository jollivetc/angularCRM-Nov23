import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  cars = ['Citroen', 'Peugeot','Tesla', 'Toyota'];

  onClick($event:MouseEvent):void{
    console.log($event);
  }
}

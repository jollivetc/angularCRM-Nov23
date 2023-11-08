import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';

  catched($event: any):void{
    console.log($event);
  }
  catched2($event: any):void{
    console.warn($event);
  }
}

import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'


const importsExports=[MatInputModule, MatToolbarModule, MatButtonModule, MatFormFieldModule]

@NgModule({
  declarations: [],
  imports: importsExports,
  exports: importsExports
})
export class AppMaterialModule { }

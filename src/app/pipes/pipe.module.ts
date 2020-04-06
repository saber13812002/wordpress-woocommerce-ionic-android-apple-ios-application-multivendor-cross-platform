import { NgModule } from '@angular/core';
import { KeysPipe } from './pipe';
import { DatePipe } from './datepipe';

@NgModule({
  declarations: [KeysPipe, DatePipe],
  exports: [KeysPipe, DatePipe]
})
export class KeysPipeModule { }

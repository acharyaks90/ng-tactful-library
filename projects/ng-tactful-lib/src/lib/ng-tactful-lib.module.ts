import { NgModule } from '@angular/core';
import { NgTactfulLibComponent } from './ng-tactful-lib.component';
import { SecondLetterCapitalPipe } from './second-letter-capital.pipe';

@NgModule({
  declarations: [NgTactfulLibComponent, SecondLetterCapitalPipe],
  imports: [
  ],
  exports: [NgTactfulLibComponent]
})
export class NgTactfulLibModule { }

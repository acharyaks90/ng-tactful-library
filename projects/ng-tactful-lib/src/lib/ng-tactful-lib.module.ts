import { NgModule } from '@angular/core';
import { NgTactfulLibComponent } from './ng-tactful-lib.component';
import { SecondLetterCapitalPipe } from './second-letter-capital.pipe';
import { NgTactFulVideoTagComponent } from './ng-tactful-video-tag/ng-tactful-video-tag.component';

@NgModule({
  declarations: [NgTactfulLibComponent, SecondLetterCapitalPipe, NgTactFulVideoTagComponent],
  imports: [
  ],
  exports: [NgTactfulLibComponent,SecondLetterCapitalPipe, NgTactFulVideoTagComponent,]
})
export class NgTactfulLibModule { }

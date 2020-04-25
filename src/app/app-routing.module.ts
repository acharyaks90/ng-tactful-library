import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { StaticComComponent } from './static-com/static-com.component';
import { HomeComponent } from './home/home.component';
import { MyComponent } from './my/my.component';
import { ExampleVideoTagComponent } from './example-video-tag/example-video-tag.component';
import { SecondLetterCapitalComponent } from './second-letter-capital/second-letter-capital.component';

const routes: Routes = [
  { path: '', component:HomeComponent  },
  { path: 'path/:routeParam', component: MyComponent },
  { path: 'staticPath', component: StaticComComponent },

  { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' } }
  { path : 'videotag', component : ExampleVideoTagComponent},
  { path : 'secondlettercapital', component : SecondLetterCapitalComponent},
  
  { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

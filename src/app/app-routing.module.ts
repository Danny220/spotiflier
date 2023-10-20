import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { IndexComponent } from './index/index.component';
import { UserCardComponent } from './index/user-card/user-card.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: IndexComponent},
  {path: 'home/:loginSuccess', component: IndexComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'profile/:isFullScreen', component: UserCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}

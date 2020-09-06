import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './post/post.component';
import {AuthenticationGuard} from './authentication.guard';  

const routes: Routes = [
  { path : '',component :LoginComponent},
  { path : 'login',component :LoginComponent},
  { path : 'register',component :RegisterComponent},
  { path : 'posts',component :PostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

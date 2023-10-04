import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
  { path: 'login', component: SignInComponent, canActivate: [LoginGuard] },
  { path: 'book', component: RecommendComponent },
  { path: 'bookshelf', component: BookshelfComponent },
  { path: 'register', component: SignUpComponent, canActivate: [LoginGuard] },
  // { path: '**', redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

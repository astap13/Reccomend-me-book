import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { LoginGuard } from './guards/login.guard';
import { RecommendComponent } from './recommend/recommend.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
  // { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'recommendation', component: RecommendComponent },
  { path: 'bookshelf', component: BookshelfComponent, canActivate: [LoginGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  // { path: '**', redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

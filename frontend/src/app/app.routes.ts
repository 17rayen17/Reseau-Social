import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { authGuard, noAuthGuard } from './guard/auth.guard';
import { SingupComponent } from './components/singup/singup.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'signup',
    component: SingupComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'social-post',
        component: PostListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'create-post', // Nested route for creating a post
        component: CreatePostComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

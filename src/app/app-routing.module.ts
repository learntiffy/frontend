import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './user-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'menu',
    canActivate: [UserAuthGuard],
    loadChildren: () =>
      import('./menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'orders',
    canActivate: [UserAuthGuard],
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
  },
  {
    path: 'manage-address',
    canActivate: [UserAuthGuard],
    loadChildren: () =>
      import('./manage-address/manage-address.module').then(
        (m) => m.ManageAddressPageModule
      ),
  },
  {
    path: 'forum',
    canActivate: [UserAuthGuard],
    loadChildren: () =>
      import('./forum/forum.module').then((m) => m.ForumPageModule),
  },
  {
    path: 'checkout/:day/:meal',
    canActivate: [UserAuthGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

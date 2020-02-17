import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    // /でアクセスするとhomemoduleにアクセスする
    path: '',
    // 厳密にhomeページのみヒットするように
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.module').then(m => m.SettingModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'addvocabulary',
    loadChildren: () =>
      import('./addvocabulary/addvocabulary.module').then(
        m => m.AddvocabularyModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'termsofsale',
    loadChildren: () =>
      import('./termsofsale/termsofsale.module').then(m => m.TermsofsaleModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'termsofuse',
    loadChildren: () =>
      import('./termsofuse/termsofuse.module').then(m => m.TermsofuseModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then(m => m.ContactModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(m => m.WelcomeModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard]
  },
  {
    path: 'myvocabulary',
    loadChildren: () =>
      import('./myvocabulary/myvocabulary.module').then(
        m => m.MyvocabularyModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'favvocabulary',
    loadChildren: () =>
      import('./favvocabulary/favvocabulary.module').then(
        m => m.FavvocabularyModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

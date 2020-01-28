import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


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
    path: 'mypage',
    loadChildren: () => import('./mypage/mypage.module').then(m => m.MypageModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'addvocabulary',
    loadChildren: () => import('./addvocabulary/addvocabulary.module').then(m => m.AddvocabularyModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'termsofsale',
    loadChildren: () => import('./termsofsale/termsofsale.module').then(m => m.TermsofsaleModule),

  },
  {
    path: 'termsofuse',
    loadChildren: () => import('./termsofuse/termsofuse.module').then(m => m.TermsofuseModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

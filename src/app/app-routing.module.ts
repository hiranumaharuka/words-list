import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    // /でアクセスするとhomemoduleにアクセスする
    path: '',
    // 厳密にhomeページのみヒットするように
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),

  },
  {
    path: 'mypage',
    loadChildren: () => import('./mypage/mypage.module').then(m => m.MypageModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
  },
  {
    path: 'addvocabulary',
    loadChildren: () => import('./addvocabulary/addvocabulary.module').then(m => m.AddvocabularyModule),
  },
  {
    path: 'termsofsale',
    loadChildren: () => import('./termsofsale/termsofsale.module').then(m => m.TermsofsaleModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

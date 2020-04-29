import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatInputModule,
  MatAutocompleteModule,
  MatFormFieldModule
} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedModule } from './shared/shared.module';
import { NgAisModule } from 'angular-instantsearch';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    SharedModule,
    AngularFireFunctionsModule,
    MatProgressBarModule,
    NgAisModule.forRoot(),
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: REGION,
      useValue: 'asia-northeast1'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

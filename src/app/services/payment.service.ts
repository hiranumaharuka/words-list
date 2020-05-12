import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material';
import { LoadingService } from './loading.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../interfaces/vocabulary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private fns: AngularFireFunctions,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private db: AngularFirestore
  ) {}

  createCustomer(params: {
    source: string;
    email: string;
    name: string;
  }): Promise<void> {
    this.loadingService.toggleLoading(true);
    const callable = this.fns.httpsCallable('createCustomer');
    return callable(params)
      .toPromise()
      .then(() => {
        this.snackBar.open('月額プランの登録完了しました', null, {
          duration: 1000
        });
        this.loadingService.toggleLoading(false);
      })
      .catch(err => {
        this.snackBar.open('月額プランの登録に失敗しました', null, {
          duration: 1000
        });
        this.loadingService.toggleLoading(false);
      });
  }

  subscribePlan(data: { customerId: string }): Promise<void> {
    this.loadingService.toggleLoading(true);
    const callable = this.fns.httpsCallable('subscribePlan');
    return callable(data)
      .toPromise()
      .then(() => this.loadingService.toggleLoading(false));
  }

  unsubscribePlan(data: { userId: string }): Promise<void> {
    this.loadingService.toggleLoading(true);
    const callable = this.fns.httpsCallable('unsubscribePlan');
    return callable(data)
      .toPromise()
      .then(() => this.loadingService.toggleLoading(false));
  }

  deleteCustomer(customerId: string) {
    const callable = this.fns.httpsCallable('deleteCustomer');
    return callable({ customerId }).toPromise();
  }

  getCustomer(userId: string): Observable<Customer> {
    return this.db.doc<Customer>(`customers/${userId}`).valueChanges();
  }
}

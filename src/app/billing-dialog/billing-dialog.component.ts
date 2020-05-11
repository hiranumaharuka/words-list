import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from 'ngx-stripe';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-billing-dialog',
  templateUrl: './billing-dialog.component.html',
  styleUrls: ['./billing-dialog.component.scss']
})
export class BillingDialogComponent implements OnInit {
  elements: Elements;
  card: StripeElement;

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'ja'
  };

  stripeTest: FormGroup;
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  get nameControl() {
    return this.stripeTest.get('name') as FormControl;
  }

  get emailControl() {
    return this.stripeTest.get('email') as FormControl;
  }

  buy() {
    const name = this.stripeTest.get('name').value;
    const email = this.stripeTest.get('email').value;
    this.stripeService.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
        const tokenId = result.token.id;
        this.paymentService.createCustomer({
          source: tokenId,
          email,
          name
        });
      } else if (result.error) {
        console.log(result.error.message);
      }
    });
  }
}

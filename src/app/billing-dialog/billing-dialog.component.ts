import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from 'ngx-stripe';

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
    locale: 'es'
  };

  stripeTest: FormGroup;
  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
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

  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
        return result.token;
      } else if (result.error) {
        return result.error.message;
      }
    });
  }
}

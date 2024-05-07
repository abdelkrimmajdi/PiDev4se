import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  priceSub = localStorage.getItem('total') || '0';


  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(
    private router: Router,
    private Act: ActivatedRoute,

  ) { }

  ngOnInit(): void {


    window.paypal.Buttons(
      {
        style: {
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.priceSub.toString(),
                  currency_code: 'USD'
                }
              }
            ]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details);
            if (details.status === 'COMPLETED') {
              console.log(details.id);
              localStorage.setItem('total','0')
              this.confirmation(details.id);

            }
          });
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  cancel() {
    this.router.navigate(['']);
  }

  //npm install -g @angular/cli@latest
  //ng new angular-sweetalert-demo (barra mel projet)
  /*"styles": [
    "src/styles.scss",
    "src/styles.css",
    "node_modules/sweetalert2/src/sweetalert2.scss"
  ],*/
  confirmation(id: any) {
    Swal.fire('Your transaction is successful.', 'Your transaction id is ' + id, 'success')
  }

}
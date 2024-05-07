import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from '../models/subscription';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.scss']
})
export class SubscriptionPaymentComponent implements OnInit {
  userconnect: User = JSON.parse(localStorage.getItem("userconnect")!);

  idSub!: number
  s!: Subscription

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(
    private router: Router,
    private Act: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private service:CartService
  ) { }

  ngOnInit(): void {
    //1- recuperer l'id depuis l'url
    this.idSub = this.Act.snapshot.params['idSub']
    //2- recuperer le produit de l'id deja recuperer
    this.subscriptionService.getSubscriptionsById(this.idSub).subscribe(
      (data) => { this.s = data }
    )
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
                  value: this.s.priceSub.toString(),
                  currency_code: 'EUR'
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
              this.confirmation(details.id);
              const mail = {
              from: "vitavibesesprit@gmail.com",
              to: this.userconnect.email,
              subject: 'Payement effectué avec succès',
              content: 'Payement effectué avec succès'
            };
            this.service.sendEmailMarket(mail).subscribe(
              () => {
                console.log('Email envoyé avec succès');
              },
              (error) => {
                console.error('Erreur lors de l\'envoi de l\'email :', error);
              }
            );

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
    this.router.navigate(['/sub']);
  }

  //npm install -g @angular/cli@latest
  //ng new angular-sweetalert-demo (barra mel projet)
  /*"styles": [
    "src/styles.scss",
    "src/styles.css",
    "node_modules/sweetalert2/src/sweetalert2.scss"
  ],*/
  confirmation(id:any) {
    Swal.fire('Your transaction is successful.', 'Your transaction id is '+id, 'success')
  }

}

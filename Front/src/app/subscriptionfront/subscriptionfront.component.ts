import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from '../models/subscription';

@Component({
  selector: 'app-subscriptionfront',
  templateUrl: './subscriptionfront.component.html',
  styleUrls: ['./subscriptionfront.component.scss']
})
export class SubscriptionfrontComponent implements OnInit {
  
  subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getAllSubscriptions().subscribe(subscriptions => {
      this.subscriptions = subscriptions.sort((a, b) => {
        // Assuming priceSub is a numeric attribute
        return a.priceSub - b.priceSub;
      });
    });
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from '../models/subscription';
import { SubscriptionService } from '../services/subscription.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  search!: string;

  constructor(private subscriptionService: SubscriptionService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getAllSubscriptions().subscribe(subscriptions => {
      this.subscriptions = subscriptions;
      // Initialize filteredExercises after exercices have been populated
      this.filteredSubscriptions = this.subscriptions;
    })
  }

  deleteSubscription(id: number) {
    this.subscriptionService.deleteSubscriptions(id).subscribe(
      () => this.ngOnInit()
    )
  }

  searchSubscriptions() {
    if (!this.search) {
      this.filteredSubscriptions = this.subscriptions;
    } else {
      const searchTermLower = this.search.toLowerCase();
      this.filteredSubscriptions = this.subscriptions.filter(s =>
        Object.values(s).some(val =>
          (typeof val === 'string' || typeof val === 'number') &&
          val.toString().toLowerCase().includes(searchTermLower)
        )
      );
    }
  }

  sortColumn: keyof Subscription | null = null; // Initialize to an empty string
  sortDirection: 'asc' | 'desc' = 'asc'; // Initialize to ascending by default

  sort(property: keyof Subscription): void {
    if (property === this.sortColumn) {
      // If the same column is clicked again, toggle the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, reset the sorting direction to ascending
      this.sortDirection = 'asc';
    }

    // Update the sortColumn to the clicked column
    this.sortColumn = property;

    this.filteredSubscriptions.sort((a, b) => {
      const valA = a[property];
      const valB = b[property];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      } else {
        return 0; // No sorting for other types
      }
    });
  }
  
}

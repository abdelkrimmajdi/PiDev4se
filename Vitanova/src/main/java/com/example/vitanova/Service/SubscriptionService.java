package com.example.vitanova.Service;

import com.example.vitanova.Entities.Subscription;

import java.util.List;
import java.util.Optional;

public interface SubscriptionService {
    List<Subscription> findAllSubscriptions();
    Optional<Subscription> findSubscriptionById(Long id);
    Subscription saveSubscription(Subscription subscription);
    Subscription updateSubscription(Long id, Subscription subscriptionDetails);
    void deleteSubscription(Long id);
}
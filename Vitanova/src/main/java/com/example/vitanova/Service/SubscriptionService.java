package com.example.vitanova.Service;

<<<<<<< HEAD
public interface SubscriptionService {

=======
import com.example.vitanova.Entities.Subscription;

import java.util.List;
import java.util.Optional;

public interface SubscriptionService {
    List<Subscription> findAllSubscriptions();
    Optional<Subscription> findSubscriptionById(Long id);
    Subscription saveSubscription(Subscription subscription);
    Subscription updateSubscription(Long id, Subscription subscriptionDetails);
    void deleteSubscription(Long id);
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}

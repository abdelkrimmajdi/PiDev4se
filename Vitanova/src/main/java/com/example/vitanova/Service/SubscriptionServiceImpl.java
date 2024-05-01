package com.example.vitanova.Service;

import com.example.vitanova.Entities.Subscription;
import com.example.vitanova.Repositorie.SubscriptionRepositorie;
<<<<<<< HEAD
=======
import lombok.AllArgsConstructor;
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
<<<<<<< HEAD
public class SubscriptionServiceImpl {
=======
@AllArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService{
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    @Autowired
    private SubscriptionRepositorie subscriptionRepositorie;

    public List<Subscription> findAllSubscriptions() {
        return subscriptionRepositorie.findAll();
    }

    public Optional<Subscription> findSubscriptionById(Long id) {
        return subscriptionRepositorie.findById(id);
    }

    public Subscription saveSubscription(Subscription subscription) {
        return subscriptionRepositorie.save(subscription);
    }

    public Subscription updateSubscription(Long id, Subscription subscriptionDetails) {
        Subscription subscription = subscriptionRepositorie.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found for this id :: " + id));

        subscription.setSabName(subscriptionDetails.getSabName());
        subscription.setStartDateSub(subscriptionDetails.getStartDateSub());
        subscription.setEndDateSub(subscriptionDetails.getEndDateSub());
        subscription.setDureeSub(subscriptionDetails.getDureeSub());

        return subscriptionRepositorie.save(subscription);
    }

    public void deleteSubscription(Long id) {
        Subscription subscription = subscriptionRepositorie.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found for this id :: " + id));
        subscriptionRepositorie.delete(subscription);
    }
<<<<<<< HEAD
=======

>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
}

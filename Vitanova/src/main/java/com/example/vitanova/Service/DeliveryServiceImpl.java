package com.example.vitanova.Service;

import com.example.vitanova.Repositorie.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.vitanova.Entities.Delivery;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryServiceImpl implements DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }


    public Delivery getDeliveryById(Long IdDelivery) {
        Optional<Delivery> optionalDelivery = deliveryRepository.findById(IdDelivery);
        return optionalDelivery.orElse(null);
    }


    public Delivery saveDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public Delivery createDelivery(Delivery delivery) {
        // Calcul du total de la commande

        return deliveryRepository.save(delivery);
    }

    public double calculateTotal(Delivery delivery) {

        double total = 0.0;
        // Calcul du coût...
        return total;
    }

    public void deleteDelivery(Long IdDelivery) {
        deliveryRepository.deleteById(IdDelivery);
    }
}

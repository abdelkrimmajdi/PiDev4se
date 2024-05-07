package com.example.vitanova.Service;
import com.example.vitanova.Entities.Delivery;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DeliveryService {
    List<Delivery> getAllDeliveries();
    Delivery getDeliveryById(Long IdDelivery);
    Delivery saveDelivery(Delivery delivery);
    void deleteDelivery(Long IdDelivery);

    Delivery createDelivery(Delivery delivery);
}


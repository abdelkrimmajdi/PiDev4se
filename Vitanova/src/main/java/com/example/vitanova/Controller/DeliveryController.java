package com.example.vitanova.Controller;


import com.example.vitanova.Entities.Delivery;
import com.example.vitanova.Service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;
    private Delivery newDelivery;

    @GetMapping("/")
    public List<Delivery> getAllDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    @GetMapping("/{id}")
    public Delivery getDeliveryById(@PathVariable Long IdDelivery) {
        return deliveryService.getDeliveryById(IdDelivery);
    }



    @PostMapping("/create")
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
        System.out.println(delivery);
        Delivery newDelivery = deliveryService.createDelivery(delivery);
        return ResponseEntity.ok(newDelivery);
    }


    @PutMapping("/{id}")
    public Delivery updateDelivery(@PathVariable Long IdDelivery, @RequestBody Delivery delivery) {
        delivery.setIdDelivery(IdDelivery);
        return deliveryService.saveDelivery(delivery);
    }

    @DeleteMapping("/{id}")
    public void deleteDelivery(@PathVariable Long id) {
        deliveryService.deleteDelivery(id);
    }
}

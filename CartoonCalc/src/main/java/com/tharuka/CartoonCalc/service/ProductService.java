package com.tharuka.CartoonCalc.service;

import com.tharuka.CartoonCalc.model.Product;
import com.tharuka.CartoonCalc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public double calculatePrice(int productId, int quantity, int cartoonQuantity) {

        if (productId <= 0) {
            throw new IllegalArgumentException("Product ID must be a positive integer.");
        }
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative.");
        }
        if (cartoonQuantity < 0) {
            throw new IllegalArgumentException("Carton quantity cannot be negative.");
        }

        // Retrieve product
        Product product = productRepository.findById((long) productId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));

        double cartonPrice = product.getPricePerCarton();
        int unitsPerCarton = product.getUnitsPerCarton();


        if (unitsPerCarton <= 0) {
            throw new IllegalArgumentException("Units per carton must be greater than zero.");
        }


        int fullCartons = quantity / unitsPerCarton;
        int remainingUnits = quantity % unitsPerCarton;

        double totalPrice = 0.0;


        if (cartoonQuantity > 0) {
            fullCartons += cartoonQuantity;
        }


        if (fullCartons > 0) {
            double cartonTotalPrice = cartonPrice * fullCartons;


            if (fullCartons >= 3) {
                cartonTotalPrice *= 0.9; // Apply 10% discount
            }
            totalPrice += cartonTotalPrice;
        }


        if (remainingUnits > 0) {
            double singleUnitPrice = cartonPrice * 1.3; // Price for single unit
            totalPrice += singleUnitPrice * remainingUnits;
        }

        return totalPrice;
    }
}

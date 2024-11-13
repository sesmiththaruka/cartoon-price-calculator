package com.tharuka.CartoonCalc.controller;

import com.tharuka.CartoonCalc.model.Product;
import com.tharuka.CartoonCalc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAllProducts();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/calculate")
    public Map<String, Double> calculatePrice(@RequestParam int productId, @RequestParam int quantity, @RequestParam int cartoonQuantity) {

        double totalPrice = productService.calculatePrice(productId, quantity, cartoonQuantity);

        Map<String, Double> response = new HashMap<>();
        response.put("totalPrice", totalPrice);
        return response;
    }
}

package com.tharuka.CartoonCalc.service;

import com.tharuka.CartoonCalc.model.Product;
import com.tharuka.CartoonCalc.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void calculateProductPriceSuccessfully() {
        // Arrange
        Product product = new Product();
        product.setId(1L);
        product.setPricePerCarton(100.0);
        product.setUnitsPerCarton(10);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        double price = productService.calculatePrice(1, 25, 0);
        assertEquals(850.0, price, 0.01);
    }
}

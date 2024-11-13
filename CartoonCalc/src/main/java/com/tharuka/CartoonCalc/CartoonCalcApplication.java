package com.tharuka.CartoonCalc;

import com.tharuka.CartoonCalc.model.Product;
import com.tharuka.CartoonCalc.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CartoonCalcApplication {

	public static void main(String[] args) {
		SpringApplication.run(CartoonCalcApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(ProductRepository productRepository){
		return args -> {
			// Check if the database is empty

			if (productRepository.findAll().isEmpty()) {

				// Save products to the database
				productRepository.save(Product.builder().name("Penguin-ears").unitsPerCarton(20).pricePerCarton(175).build());
				productRepository.save(Product.builder().name("Horseshoe").unitsPerCarton(5).pricePerCarton(825).build());
				System.out.println("Initial products have been added to the database.");
			} else {
				System.out.println("Database already contains products. No initial data added.");
			}
		};
	}

}

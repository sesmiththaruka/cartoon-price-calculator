import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  priceTable: { quantity: number; penguinEarsPrice: number; horseshoePrice: number }[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  paginatedTable: any[] = [];
  masterSrv = inject(MasterService);

  ngOnInit(): void {
    this.masterSrv.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.generatePriceTable();
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }

  generatePriceTable(): void {
    const penguinEars = this.products.find(product => product.name === 'Penguin-ears');
    const horseshoe = this.products.find(product => product.name === 'Horseshoe');

    if (!penguinEars || !horseshoe) {
      console.error("Product not found");
      return;
    }

    for (let quantity = 1; quantity <= 50; quantity++) {
      const penguinEarsPrice = this.calculatePrice(quantity, penguinEars.unitsPerCarton, penguinEars.pricePerCarton);
      const horseshoePrice = this.calculatePrice(quantity, horseshoe.unitsPerCarton, horseshoe.pricePerCarton);

      this.priceTable.push({ quantity, penguinEarsPrice, horseshoePrice });
    }
    this.updatePaginatedTable();
  }

  calculatePrice(quantity: number, unitsPerCarton: number, pricePerCarton: number): number {
    const cartons = Math.floor(quantity / unitsPerCarton);
    const remainingUnits = quantity % unitsPerCarton;
  
     let totalPrice = 0;

     totalPrice += cartons * pricePerCarton;
 
     if (remainingUnits > 0) {
         totalPrice += (pricePerCarton / unitsPerCarton) * remainingUnits;
     }
 
     if (quantity < unitsPerCarton) {
         totalPrice = quantity * (pricePerCarton * 1.3);
     }
 
     if (cartons >= 3) {
         totalPrice *= 0.9; 
     }
 
     return totalPrice;
  
  }

  get totalPages(): number {
    return Math.ceil(this.priceTable.length / this.itemsPerPage);
  }

  updatePaginatedTable(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTable = this.priceTable.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedTable();
    }
  }
}

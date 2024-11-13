import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-price-calculation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgIf],
  templateUrl: './price-calculation.component.html',
  styleUrl: './price-calculation.component.css'
})
export class PriceCalculationComponent implements OnInit {
  orderForm: FormGroup;
  totalPrice: number = 0;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      productSelect: ['', Validators.required],
      quantitySingle: [0, [Validators.required, Validators.min(0)]],
      quantityCartoon: [0, [Validators.required, Validators.min(0)]],
    });
  }
  products: any[] = [];
  masterSrv = inject(MasterService);

  ngOnInit(): void {
    this.masterSrv.getProducts().subscribe(
      (data) => {
        this.products = data;

      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }
  calculateTotal() {
    if (this.orderForm.invalid) {

      this.orderForm.markAllAsTouched();
      return; 
  }
    const selectedProduct = this.products.find(
      (p) => p.id == this.orderForm.value.productSelect
    );
    if (selectedProduct) {

      const quantitySingle = this.orderForm.get('quantitySingle')?.value;
      const quantityCartoon = this.orderForm.get('quantityCartoon')?.value;
      
      this.masterSrv.calculateTotal(selectedProduct.id, quantitySingle,quantityCartoon).subscribe(
        (data) => {
          this.totalPrice = data.totalPrice;
          console.log("data from api", data);
        },

        (error) => {
          console.error("Error fetching total:", error);
        }
      );

    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface PriceResponse {
  totalPrice: number;
}
@Injectable({
  providedIn: 'root'
})

export class MasterService {
 
  apiUrl: string = "http://localhost:8080/api/products";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  calculateTotal(productId: number,singleqty:number, quantityCartoon:number){
    return this.http.get<PriceResponse>(`${this.apiUrl}/calculate?productId=${productId}&quantity=${singleqty}&cartoonQuantity=${quantityCartoon}`)
  }
  
}

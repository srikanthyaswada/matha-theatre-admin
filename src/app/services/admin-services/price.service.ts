import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  jwttoken(): any {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
      }),
    };
    return header;
  }
  private apiUrl = 'http://localhost:4000/price';

  constructor(private http: HttpClient) {}

  addPrice(priceData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/addPrice`,
      priceData,
      this.jwttoken()
    );
  }

  getPrices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getPrices`, this.jwttoken());
  }

  updatePrice(priceId: string, updatedData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updatePrice/${priceId}`,
      updatedData,
      this.jwttoken()
    );
  }

  deletePrice(priceId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deletePrice/${priceId}`,
      this.jwttoken()
    );
  }
}

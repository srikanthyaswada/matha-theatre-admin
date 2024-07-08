import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private addPriceUrl = 'http://localhost:4000/price/addprice';
  private getPriceUrl = 'http://localhost:4000/price/getprices';
  private getPriceUrlById = 'http://localhost:4000/price/getPriceWithId';
  private editPriceUrl = 'http://localhost:4000/price/updateprice/';
  private deletePriceUrl = 'http://localhost:4000/price/deleteprice/';
  private getTheatresWithIdUrl = 'http://localhost:4000/price/gettheatres';
  private getCapacityWithIdUrl = 'http://localhost:4000/capacity/getCapacityWithId';

  constructor(private http: HttpClient) {}

  addPrice(slotData: any): Observable<any> {
    return this.http.post(this.addPriceUrl, slotData);
  }
  getPrice(): Observable<any> {
    return this.http.get(this.getPriceUrl);
  }
  getPriceById(priceId: any): Observable<any> {
    return this.http.post(this.getPriceUrlById, priceId);
  }

  getCapacityById(id: any): Observable<any> {
    return this.http.post(this.getCapacityWithIdUrl, {theatreId:id});
  }
  getTheatreById(): Observable<any> {
    return this.http.get(this.getTheatresWithIdUrl);
  }
  editPrice(id: any, data: any): Observable<any> {
    return this.http.put(this.editPriceUrl + id, data);
  }
  deletePrice(id: any): Observable<any> {
    return this.http.delete(this.deletePriceUrl + id);
  }
}

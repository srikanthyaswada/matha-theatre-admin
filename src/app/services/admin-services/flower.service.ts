import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  private baseUrl = 'http://localhost:4000/flower';

  constructor(private http: HttpClient) {}

  addFlowers(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addflower`, data);
    // return this.http.post(this.addCakeUrl, data);
  }
  getFlowers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getflowers`);

    // return this.http.get(this.getCakeUrl);
  }
  editFlowers(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateflower/${id}`, data);
    // return this.http.put(this.editCakeUrl + id, data);
  }
  deleteFlowers(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteflower/${id}`);
    //return this.http.delete(this.deleteCakeUrl + id);
  }
}

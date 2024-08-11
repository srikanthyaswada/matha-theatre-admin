import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CakeService {
  private baseUrl = 'http://localhost:4000/cake';

  // private addCakeUrl = 'http://localhost:4000/cake/addcake';
  // private getCakeUrl = 'http://localhost:4000/cake/getcake';
  // private editCakeUrl = 'http://localhost:4000/cake/updatecake/';
  // private deleteCakeUrl = 'http://localhost:4000/cake/deletecake/';

  constructor(private http: HttpClient) {}

  addCakes(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addcake`, data);
    // return this.http.post(this.addCakeUrl, data);
  }
  getCakes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getcake`);

    // return this.http.get(this.getCakeUrl);
  }
  editCakes(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatecake/${id}`, data);
    // return this.http.put(this.editCakeUrl + id, data);
  }
  deleteCakes(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletecake/${id}`);
    //return this.http.delete(this.deleteCakeUrl + id);
  }
}

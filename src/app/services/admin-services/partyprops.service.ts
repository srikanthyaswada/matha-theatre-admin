import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartypropsService {
  private baseUrl = 'http://localhost:4000/party';

  constructor(private http: HttpClient) {}

  addPartyprops(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addparty`, data);
  }
  getPartyprops(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getparties`);
  }
  editPartyprops(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateparty/${id}`, data);
  }
  deletePartyprops(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteparty/${id}`);
  }
}

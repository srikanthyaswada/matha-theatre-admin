import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  private apiUrl = 'http://localhost:4000/slot';

  constructor(private http: HttpClient) {}

  private jwttoken(): any {
    const token = localStorage.getItem('adminToken');
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }

  addSlot(slotData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addSlot`, slotData, this.jwttoken());
  }

  getSlots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSlots`, this.jwttoken());
  }

  updateSlot(id: string, updatedData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateSlot/${id}`,
      updatedData,
      this.jwttoken()
    );
  }

  deleteSlot(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteSlot/${id}`, this.jwttoken());
  }
}

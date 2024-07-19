import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacityService {
  private apiUrl = 'http://localhost:4000/capacity';

  constructor(private http: HttpClient) {}

  jwttoken(): any {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
      }),
    };
    return header;
  }

  addCapacity(capacityData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/addCapacity`,
      capacityData,
      this.jwttoken()
    );
  }

  getCapacities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getCapacities`, this.jwttoken());
  }

  updateCapacity(capacityId: string, updatedData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateCapacity/${capacityId}`,
      updatedData,
      this.jwttoken()
    );
  }

  deleteCapacity(capacityId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deleteCapacity/${capacityId}`,
      this.jwttoken()
    );
  }
}

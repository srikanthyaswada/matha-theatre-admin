import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private loginUrl = 'http://localhost:4000/admin/adminlogin';
  
 
  constructor(private http: HttpClient) {}

  login(adminData: any): Observable<any> {
    return this.http.post(this.loginUrl, adminData);
  }

  
 
}

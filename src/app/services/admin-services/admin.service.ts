import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private loginUrl = 'http://localhost:4000/admin/adminLogin';
  private profileUrl = 'http://localhost:4000/admin/adminProfile/:id';

  jwttoken(): any {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('admin'),
      }),
    };
    return header;
  }

  constructor(private http: HttpClient) {}

  login(adminData: any): Observable<any> {
    return this.http.post(this.loginUrl, adminData);
  }

  profile() {
    return this.http.get(this.profileUrl, this.jwttoken());
  }
}

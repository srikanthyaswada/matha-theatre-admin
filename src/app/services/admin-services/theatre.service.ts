import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TheatreService {
  private theatreUrl = 'http://localhost:4000/theatre/addTheatre';
  private getTheatreUrl = 'http://localhost:4000/theatre/getTheatres';
  private editTheatreUrl = 'http://localhost:4000/theatre/updateTheatre/';
  private deleteTheatreUrl = 'http://localhost:4000/theatre/deletetheatre/';

  constructor(private http: HttpClient) {}

  jwttoken(): any {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'),
      }),
    };
    return header;
  }

  addTheatres(theatreData: any): Observable<any> {
    return this.http.post(this.theatreUrl, theatreData, this.jwttoken());
  }
  getTheatres(): Observable<any> {
    return this.http.get(this.getTheatreUrl, this.jwttoken());
  }
  editTheatres(id: any, data: any): Observable<any> {
    return this.http.put(this.editTheatreUrl + id, data, this.jwttoken());
  }
  deleteTheatres(id: any): Observable<any> {
    return this.http.delete(this.deleteTheatreUrl + id, this.jwttoken());
  }
}

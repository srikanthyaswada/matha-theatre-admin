import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TheatreService {
  private theatreUrl = 'http://localhost:4000/theatre/addtheatre';
  private getTheatreUrl = 'http://localhost:4000/theatre/gettheatres';
  private editTheatreUrl = 'http://localhost:4000/theatre/updatetheatre/';
  private deleteTheatreUrl = 'http://localhost:4000/theatre/deletetheatre/';

  constructor(private http: HttpClient) {}

  addTheatre(theatreData: any): Observable<any> {
    return this.http.post(this.theatreUrl, theatreData);
  }
  getTheatres(): Observable<any> {
    return this.http.get(this.getTheatreUrl);
  }
  editTheatres(id: any, data: any): Observable<any> {
    return this.http.put(this.editTheatreUrl + id, data);
  }
  deleteTheatres(id: any): Observable<any> {
    return this.http.delete(this.deleteTheatreUrl + id);
  }
}

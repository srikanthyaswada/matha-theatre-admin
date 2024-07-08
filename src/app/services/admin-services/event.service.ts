import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private addEventUrl = 'http://localhost:4000/celebration/addcelebration';
  private getEventUrl = 'http://localhost:4000/celebration/getcelebrations';
  private editEventUrl = 'http://localhost:4000/celebration/updatecelebration/';
  private deleteEventUrl = 'http://localhost:4000/celebration/deletecelebration/';

  constructor(private http: HttpClient) {}

  addEvents(data: any): Observable<any> {
    return this.http.post(this.addEventUrl, data);
  }
  getEvents(): Observable<any> {
    return this.http.get(this.getEventUrl);
  }
  editEvents(id: any, data: any): Observable<any> {
    return this.http.put(this.editEventUrl + id, data);
  }
  deleteEvents(id: any): Observable<any> {
    return this.http.delete(this.deleteEventUrl + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {
  private addCapacityUrl = 'http://localhost:4000/capacity/addCapacity';
  private getCapacityUrl = 'http://localhost:4000/capacity/getCapacity';
  private getCapacityUrlById = 'http://localhost:4000/capacityy/getCapacityWithId';
  private editCapacityUrl = 'http://localhost:4000/capacity/updateCapacity/';
  private deleteCapacityUrl = 'http://localhost:4000/capacity/deleteCapacity/';
  private getTheatresWithIdUrl = 'http://localhost:4000/capacity/gettheatres';
  constructor(private http: HttpClient) {}

  addCapacity(slotData: any): Observable<any> {
    return this.http.post(this.addCapacityUrl, slotData);
  }
  getCapacity(): Observable<any> {
    return this.http.get(this.getCapacityUrl);
  }
  getCapacityById(theatreId:any):Observable<any> {
    return this.http.post(this.getCapacityUrlById, theatreId);
  }

  getTheatreById():Observable<any> {
    return this.http.get(this.getTheatresWithIdUrl)
  }
  editCapacity(id: any, data: any): Observable<any> {
    return this.http.put(this.editCapacityUrl + id, data);
  }
  deleteCapacity(id: any): Observable<any> {
    return this.http.delete(this.deleteCapacityUrl + id);
  }
 
}

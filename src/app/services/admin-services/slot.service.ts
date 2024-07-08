import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SlotService {
  private addSlotUrl = 'http://localhost:4000/slots/addslot';
  private getSlotUrl = 'http://localhost:4000/slots/getslots';
  private editSlotUrl = 'http://localhost:4000/slots/updateslot/';
  private deleteSlotUrl = 'http://localhost:4000/slots/deleteslot/';
  constructor(private http: HttpClient) {}

  addSlots(slotData: any): Observable<any> {
    return this.http.post(this.addSlotUrl, slotData);
  }
  getSlots(): Observable<any> {
    return this.http.get(this.getSlotUrl);
  }
  editSlots(id: any, data: any): Observable<any> {
    return this.http.put(this.editSlotUrl + id, data);
  }
  deleteSlots(id: any): Observable<any> {
    return this.http.delete(this.deleteSlotUrl + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private addPhotoUrl = 'http://localhost:4000/photos/addphoto';
  private getPhotoUrl = 'http://localhost:4000/photos/getphoto';
  private editPhotoUrl = 'http://localhost:4000/photos/updatephoto/';
  private deletePhotoUrl = 'http://localhost:4000/photos/deletephoto/';
  constructor(private http: HttpClient) {}

  addPhotos(photosData: any): Observable<any> {
    return this.http.post(this.addPhotoUrl, photosData);
  }
  getPhotos(): Observable<any> {
    return this.http.get(this.getPhotoUrl);
  }
  editPhotos(id: any, data: any): Observable<any> {
    return this.http.put(this.editPhotoUrl + id, data);
  }
  deletePhotos(id: any): Observable<any> {
    return this.http.delete(this.deletePhotoUrl + id);
  }
}

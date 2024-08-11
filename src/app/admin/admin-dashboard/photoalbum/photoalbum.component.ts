import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PhotoService } from '../../../services/admin-services/photo.service';
import { Router } from '@angular/router';
import { DeletephotosComponent } from '../deletephotos/deletephotos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-photoalbum',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './photoalbum.component.html',
  styleUrl: './photoalbum.component.scss',
})
export class PhotoalbumComponent {
  photoForm: FormGroup;
  photos: any;

  photoId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.photoForm = this.fb.group({
      photoscount: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe((res: any) => {
      this.photos = res;
      // console.log(res);
    });
  }

  addPhoto() {
    if (this.photoForm.valid) {
      const photoData = this.photoForm.value;
      this.photoService.addPhotos(photoData).subscribe((res) => {
        console.log(res);
        this.router
          .navigateByUrl('/admin/home', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/admin/photo']);
          });
      });
    } else {
      console.log('Form is invalid');
    }
  }

  editPhoto(p: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(p);

    this.photoId = p._id;
    this.photoForm.patchValue({
      photoscount: p.photoscount,
      price: p.price,
    });
  }

  updatePhoto() {
    this.photoService
      .editPhotos(this.photoId, this.photoForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/photo']);
      });
  }

  confirmDeletePhoto(p: any) {
    console.log(p, p._id);
    this.dialog.open(DeletephotosComponent, {
      data: p,
    });
  }
}

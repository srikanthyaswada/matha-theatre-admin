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
import { DeletetheatreComponent } from '../deletetheatre/deletetheatre.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TheatreService } from '../../../services/admin-services/theatre.service';

@Component({
  selector: 'app-theatre',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './theatre.component.html',
  styleUrl: './theatre.component.scss',
})
export class TheatreComponent {
  theatreForm: FormGroup;

  selectedFile!: File;
  theatresList: any;
  theatreId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: TheatreService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.theatreForm = this.fb.group({
      theatrename: ['', [Validators.required, Validators.minLength(3)]],
      theatreImage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getTheatres().subscribe((res: any) => {
      this.theatresList = res;
      //console.log(res);
    });
  }
  getCakeImageUrl(theatreImg: any) {
    return `http://localhost:4000/uploads/${theatreImg}`;
  }
  seletedfile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile, 'file selected');
  }

  addTheatres(): void {
    if (this.theatreForm.valid) {
      let formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('theatrename', this.theatreForm.value.theatrename);
      this.apiService.addTheatre(formData).subscribe(
        (res) => {
          console.log('Theatre added successfully', res);
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/theatre']);
            });
        },

        (error) => {
          console.error('Error while adding theatre', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  editTheatre(t: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(t);

    this.theatreId = t._id;
    this.theatreForm.patchValue({
      theatrename: t.theatrename,
      theatreImage: t.theatreImage,
    });
  }

  updateTheatre() {
    this.apiService
      .editTheatres(this.theatreId, this.theatreForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
      this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/theatre']);
      });
  }

  confirmDeleteTheatre(t: any) {
    console.log(t, t._id);
    this.dialog.open(DeletetheatreComponent, {
      data: t,
    });
  }
}

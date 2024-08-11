import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeletetheatreComponent } from '../deletetheatre/deletetheatre.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TheatreService } from '../../../services/admin-services/theatre.service';

@Component({
  selector: 'app-theatre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.scss'],
})
export class TheatreComponent implements OnInit {
  theatreForm: FormGroup;
  selectedFile!: File;
  theatresList: any = [];
  filteredTheatresList: any = [];
  theatreId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: TheatreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.theatreForm = this.fb.group({
      theatrename: ['', [Validators.required, Validators.minLength(3)]],
      theatreImage: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getTheatres().subscribe(
      (res: any) => {
        this.theatresList = res;
        this.filteredTheatresList = res;
      },
      (error) => {
        console.error('Error fetching theatres:', error);
      }
    );
  }

  getImageUrl(theatreImg: any): string {
    return `http://localhost:4000/uploads/${theatreImg}`;
  }

  selectedFiles(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    console.log('File selected:', this.selectedFile);
  }

  addTheatre(): void {
    if (this.theatreForm.valid) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('theatrename', this.theatreForm.value.theatrename);

      this.apiService.addTheatres(formData).subscribe(
        (res) => {
          console.log('Theatre added successfully', res);
          this.openSnackBar(
            'Theatre added successfully',
            'X',
            'snack-bar-success'
          );
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => this.router.navigate(['/admin/theatre']));

          this.refreshTheatres();
        },
        (error) => {
          console.error('Error while adding theatre', error);
          this.openSnackBar(
            'Error while adding theatre',
            'X',
            'snack-bar-error'
          );
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  editTheatre(theatre: any): void {
    this.addBtn = false;
    this.updateBtn = true;
    this.theatreId = theatre._id;

    this.theatreForm.patchValue({
      theatrename: theatre.theatrename,
      theatreImage: theatre.theatreImage,
    });
  }

  updateTheatre(): void {
    if (this.theatreForm.valid) {
      const formData = new FormData();
      formData.append('theatrename', this.theatreForm.value.theatrename);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.apiService.editTheatres(this.theatreId, formData).subscribe(
        (res: any) => {
          console.log('Theatre updated successfully', res);
          this.openSnackBar(
            'Theatre updated successfully',
            'X',
            'snack-bar-update'
          );
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => this.router.navigate(['/admin/theatre']));

          this.refreshTheatres();
        },
        (error) => {
          console.error('Error while updating theatre', error);
          this.openSnackBar(
            'Error while updating theatre',
            'X',
            'snack-bar-error'
          );
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  confirmDeleteTheatre(theatre: any): void {
    console.log('Deleting theatre:', theatre._id);
    const dialogRef = this.dialog.open(DeletetheatreComponent, {
      data: theatre,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteTheatres(theatre._id).subscribe(
          (res) => {
            console.log('Theatre deleted successfully', res);
            this.openSnackBar(
              'Theatre deleted successfully',
              'X',
              'snack-bar-delete'
            );
            this.refreshTheatres();
            this.router
              .navigateByUrl('/admin/home', { skipLocationChange: true })
              .then(() => this.router.navigate(['/admin/theatre']));
          },
          (error) => {}
        );
      }
    });
  }

  filterTheatres(): void {
    this.filteredTheatresList = this.theatresList.filter((theatre: any) =>
      theatre.theatrename.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  refreshTheatres(): void {
    this.apiService.getTheatres().subscribe(
      (res: any) => {
        this.theatresList = res;
        this.filterTheatres();
      },
      (error) => {
        console.error('Error fetching theatres:', error);
      }
    );
  }

  openSnackBar(message: string, action: string, className: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar', className],
    });
  }
}

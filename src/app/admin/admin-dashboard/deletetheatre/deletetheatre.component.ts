import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TheatreService } from '../../../services/admin-services/theatre.service';

@Component({
  selector: 'app-deletetheatre',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './deletetheatre.component.html',
  styleUrls: ['./deletetheatre.component.scss'],
})
export class DeletetheatreComponent {
  constructor(
    private apiService: TheatreService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeletetheatreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.apiService.deleteTheatres(this.data._id).subscribe(
      (res: any) => {
        console.log('Deletion successful:', res);
        this.dialogRef.close(true);
        this.snackBar.open('Theatre deleted successfully.', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar', 'snack-bar-delete'],
        });

        this.router
          .navigateByUrl('/admin/home', { skipLocationChange: true })
          .then(() => this.router.navigate(['/admin/theatre']));
      },
      (error) => {
        console.error('Error while deleting theatre:', error);
        this.snackBar.open('Error while deleting theatre.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['custom-snackbar', 'snack-bar-error'],
        });
        this.dialogRef.close(false);
      }
    );
  }
}

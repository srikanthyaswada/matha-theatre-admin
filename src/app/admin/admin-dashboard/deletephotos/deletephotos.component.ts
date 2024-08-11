import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PhotoService } from '../../../services/admin-services/photo.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA,MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletephotos',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './deletephotos.component.html',
  styleUrl: './deletephotos.component.scss',
})
export class DeletephotosComponent {
  constructor(
    private apiService: PhotoService,
    private router: Router,
    public dialogRef: MatDialogRef<DeletephotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    console.log(this.data._id);

    this.apiService.deletePhotos(this.data._id).subscribe((res: any) => {
      console.log(res);
    });
    this.dialogRef.close(true);
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/photo']);
      });
  }
}

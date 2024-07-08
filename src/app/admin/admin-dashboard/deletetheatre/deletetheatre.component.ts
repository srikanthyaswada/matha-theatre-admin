import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TheatreService } from '../../../services/admin-services/theatre.service';

@Component({
  selector: 'app-deletetheatre',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './deletetheatre.component.html',
  styleUrl: './deletetheatre.component.scss',
})
export class DeletetheatreComponent {
  constructor(
    private apiService: TheatreService,
    private router: Router,
    public dialogRef: MatDialogRef<DeletetheatreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    console.log(this.data._id);

    this.apiService.deleteTheatres(this.data._id).subscribe((res: any) => {
      console.log(res);
    });
    this.dialogRef.close(true);
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/theatre']);
      });
  }
}

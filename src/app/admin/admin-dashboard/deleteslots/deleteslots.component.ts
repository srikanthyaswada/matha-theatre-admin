import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SlotService } from '../../../services/admin-services/slot.service';

@Component({
  selector: 'app-deleteslots',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './deleteslots.component.html',
  styleUrl: './deleteslots.component.scss',
})
export class DeleteslotsComponent {
  constructor(
    private apiService: SlotService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteslotsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    console.log(this.data._id);

    this.apiService.deleteSlots(this.data._id).subscribe((res: any) => {
      console.log(res);
    });
    this.dialogRef.close(true);
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/slot']);
      });
  }
}

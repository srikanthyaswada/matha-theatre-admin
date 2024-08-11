import { Component, Inject } from '@angular/core';
import { PartypropsService } from '../../../services/admin-services/partyprops.service';
import { Router } from '@angular/router';
import { DeletetheatreComponent } from '../deletetheatre/deletetheatre.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deletepartyprops',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './deletepartyprops.component.html',
  styleUrl: './deletepartyprops.component.scss'
})
export class DeletepartypropsComponent {
  constructor(
    private apiService: PartypropsService,
    private router: Router,
    public dialogRef: MatDialogRef<DeletetheatreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    console.log(this.data._id);

    this.apiService.deletePartyprops(this.data._id).subscribe((res: any) => {
      console.log(res);
    });
    this.dialogRef.close(true);
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/props']);
      });
  }
}

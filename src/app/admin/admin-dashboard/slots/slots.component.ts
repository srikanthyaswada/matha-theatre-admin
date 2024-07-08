import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SlotService } from '../../../services/admin-services/slot.service';
import { Router } from '@angular/router';
import { DeleteslotsComponent } from '../deleteslots/deleteslots.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.scss',
})
export class SlotsComponent {
  slotRangeForm!: FormGroup;
  slots: any;

  photoId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: SlotService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.slotRangeForm = this.fb.group({
      fromslot: ['', Validators.required],
      toslot: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getSlots().subscribe((res: any) => {
      this.slots = res;
     // console.log(res);
    });
  }

  addSlot() {
    if (this.slotRangeForm.valid) {
      this.apiService
        .addSlots(this.slotRangeForm.value)
        .subscribe((res: any) => {
          console.log(res);
        });
      this.slotRangeForm.reset();
      this.router
        .navigateByUrl('/admin/home', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/admin/slot']);
        });
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

  editSlot(p: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(p);

    this.photoId = p._id;
    this.slotRangeForm.patchValue({
      fromslot: p.fromslot,
      toslot: p.toslot,
    });
  }


  updateSlot() {
    this.apiService
      .editSlots(this.photoId, this.slotRangeForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/slot']);
      });
  }


  confirmDeleteSlot(p: any) {
    console.log(p, p._id);
    this.dialog.open(DeleteslotsComponent, {
      data: p,
    });
  }
  convertTo12Hour(time24hr: string): string {
    const [hours, minutes] = time24hr.split(':');
    let formattedTime = '';
    let period = '';

    if (parseInt(hours) === 0) {
      formattedTime = '12';
      period = 'AM';
    } else if (parseInt(hours) < 12) {
      formattedTime = hours;
      period = 'AM';
    } else if (parseInt(hours) === 12) {
      formattedTime = '12';
      period = 'PM';
    } else {
      formattedTime = (parseInt(hours) - 12).toString();
      period = 'PM';
    }

    return `${formattedTime}:${minutes} ${period}`;
  }
}

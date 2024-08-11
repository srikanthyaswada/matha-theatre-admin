import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SlotService } from '../../../services/admin-services/slot.service';
import { TheatreService } from '../../../services/admin-services/theatre.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  slotRangeForm: FormGroup;
  slots: any[] = [];
  theatresListWithId: any[] = [];
  addBtn = true;
  updateBtn = false;
  selectedSlotId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private slotService: SlotService,
    private theatreService: TheatreService,
    private snackBar: MatSnackBar
  ) {
    this.slotRangeForm = this.fb.group({
      theatreId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSlots();
    this.getTheatres();
  }

  getTheatres(): void {
    this.theatreService.getTheatres().subscribe((theatres) => {
      this.theatresListWithId = theatres;
    });
  }

  loadSlots(): void {
    this.slotService.getSlots().subscribe(
      (response) => {
        this.slots = response;
      },
      (error) => {
        this.snackBar.open('Failed to load slots', 'Close', { duration: 3000 });
      }
    );
  }

  addSlot(): void {
    if (this.slotRangeForm.invalid) {
      return;
    }

    this.slotService.addSlot(this.slotRangeForm.value).subscribe(() => {
      this.snackBar.open('Slot added successfully', 'Close', {
        duration: 3000,
      });
      this.loadSlots();
      this.slotRangeForm.reset();
    });
  }

  editSlot(slot: any): void {
    this.addBtn = false;
    this.updateBtn = true;
    this.selectedSlotId = slot._id;

    // Patch form values with slot details
    this.slotRangeForm.patchValue({
      theatreId: slot.theatre._id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  }

  updateSlot(): void {
    if (this.slotRangeForm.invalid || !this.selectedSlotId) {
      return;
    }

    this.slotService
      .updateSlot(this.selectedSlotId, this.slotRangeForm.value)
      .subscribe(() => {
        this.snackBar.open('Slot updated successfully', 'Close', {
          duration: 3000,
        });
        this.loadSlots();
        this.slotRangeForm.reset();
        this.addBtn = true;
        this.updateBtn = false;
        this.selectedSlotId = null;
      });
  }

  confirmDeleteSlot(slot: any): void {
    if (confirm('Are you sure you want to delete this slot?')) {
      this.slotService.deleteSlot(slot._id).subscribe(() => {
        this.snackBar.open('Slot deleted successfully', 'Close', {
          duration: 3000,
        });
        this.loadSlots();
      });
    }
  }

  convertTo12Hour(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}

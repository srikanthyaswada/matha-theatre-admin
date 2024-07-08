import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CapacityService } from '../../../services/admin-services/capacity.service';
import { TheatreService } from '../../../services/admin-services/theatre.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-capacity',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './capacity.component.html',
  styleUrl: './capacity.component.scss',
})
export class CapacityComponent {
  confirmDeleteCapacity(_t64: any) {
    throw new Error('Method not implemented.');
  }
  editCapacity(_t64: any) {
    throw new Error('Method not implemented.');
  }
  capacityForm!: FormGroup;
  capatices: any;
  theatres: any;
  theatresListWithId: any;

  capacityId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private theatreApi: TheatreService,
    private capacityService: CapacityService,
    private router: Router
  ) {
    this.capacityForm = this.fb.group({
      theatreId: ['', Validators.required],
      capacity: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(1),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.capacityService.getCapacity().subscribe((res) => {
      this.capatices = res;
      console.log(res);
    });

    this.theatreApi.getTheatres().subscribe((res: any) => {
      this.theatres = res;
    //  console.log(res);
    });
    this.capacityService.getTheatreById().subscribe((res: any) => {
      this.theatresListWithId = res;
     // console.log(res);
    });
  }

  addCapacity(): void {
    if (this.capacityForm.valid) {
      this.capacityService
        .addCapacity(this.capacityForm.value)
        .subscribe((res: any) => {
          console.log(res);
        });
      this.capacityForm.reset();
      this.router
        .navigateByUrl('/admin/home', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/admin/capacity']);
        });
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

  updateCapacity() {}
}

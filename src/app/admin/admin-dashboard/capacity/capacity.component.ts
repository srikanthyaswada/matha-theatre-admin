import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./capacity.component.scss'],
})
export class CapacityComponent implements OnInit {
  capacityForm: FormGroup;
  capacities: any[] = [];
  filteredCapacities: any[] = [];
  theatresListWithId: any[] = [];
  addBtn = true;
  updateBtn = false;
  selectedCapacity: any;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private capacityService: CapacityService,
    private theatreService: TheatreService,
    private router: Router
  ) {
    this.capacityForm = this.fb.group({
      theatreId: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      basePrice: ['', [Validators.required, Validators.min(0)]],
      extraPricePerPerson: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.getCapacities();
    this.getTheatres();
  }

  getCapacities(): void {
    this.capacityService.getCapacities().subscribe((capacities) => {
      this.capacities = capacities;
      this.filteredCapacities = capacities;
    });
  }

  getTheatres(): void {
    this.theatreService.getTheatres().subscribe((theatres) => {
      this.theatresListWithId = theatres;
    });
  }

  addCapacity(): void {
    if (this.capacityForm.invalid) {
      return;
    }

    this.capacityService.addCapacity(this.capacityForm.value).subscribe(() => {
      this.getCapacities();
      this.capacityForm.reset();
      this.router
        .navigateByUrl('/admin/home', { skipLocationChange: true })
        .then(() => this.router.navigate(['/admin/capacity']));
    });
  }

  editCapacity(capacity: any): void {
    this.addBtn = false;
    this.updateBtn = true;
    this.selectedCapacity = capacity;
    this.capacityForm.patchValue({
      theatreId: capacity.theatre._id,
      capacity: capacity.capacity,
      basePrice: capacity.basePrice,
      extraPricePerPerson: capacity.extraPricePerPerson,
    });
  }

  updateCapacity(): void {
    if (this.capacityForm.invalid) {
      return;
    }

    this.capacityService
      .updateCapacity(this.selectedCapacity._id, this.capacityForm.value)
      .subscribe(() => {
        this.getCapacities();
        this.addBtn = true;
        this.updateBtn = false;
        this.capacityForm.reset();
        this.router
          .navigateByUrl('/admin/home', { skipLocationChange: true })
          .then(() => this.router.navigate(['/admin/capacity']));
      });
  }

  confirmDeleteCapacity(capacity: any): void {
    if (confirm('Are you sure you want to delete this capacity?')) {
      this.capacityService.deleteCapacity(capacity._id).subscribe(() => {
        this.getCapacities();
        this.router
          .navigateByUrl('/admin/home', { skipLocationChange: true })
          .then(() => this.router.navigate(['/admin/capacity']));
      });
    }
  }

  filterCapacities(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCapacities = this.capacities.filter(capacity =>
      capacity.theatre?.theatrename.toLowerCase().includes(term) ||
      capacity.capacity.toString().includes(term) ||
      capacity.basePrice.toString().includes(term) ||
      capacity.extraPricePerPerson.toString().includes(term)
    );
  }
}

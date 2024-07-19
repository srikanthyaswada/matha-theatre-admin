import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PriceService } from '../../../services/admin-services/price.service';
import { CapacityService } from '../../../services/admin-services/capacity.service';
import { Router } from '@angular/router';
import { TheatreService } from '../../../services/admin-services/theatre.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
})
export class PriceComponent {
  priceForm: FormGroup;
  prices: any[] = [];
  theatresListWithId: any[] = [];
  selectedTheatre: any = null;
  isAdmin: boolean = true;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private theatreService: TheatreService,
    private priceService: PriceService
  ) {
    this.priceForm = this.fb.group({
      theatreId: ['', Validators.required],
      basePrice: ['', Validators.required],
      extraPricePerPerson: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPrices();
    this.getTheatresWithId();
  }

  getPrices(): void {
    this.priceService.getPrices().subscribe(
      (res: any) => {
        this.prices = res;
      },
      (error) => {
        console.error('Error fetching prices:', error);
      }
    );
  }

  getTheatresWithId(): void {
    this.theatreService.getTheatres().subscribe(
      (res: any) => {
        this.theatresListWithId = res;
      },
      (error) => {
        console.error('Error fetching theatres with IDs:', error);
      }
    );
  }

  onTheatreChange(): void {
    const selectedTheatreId = this.priceForm.value.theatreId;
    this.selectedTheatre = this.theatresListWithId.find(
      (theatre) => theatre._id === selectedTheatreId
    );
    if (this.selectedTheatre) {
      this.priceForm.patchValue({
        basePrice: this.selectedTheatre.basePrice,
        extraPricePerPerson: this.selectedTheatre.extraPricePerPerson,
      });
    }
  }

  addPrice(): void {
    if (this.priceForm.valid) {
      this.priceService.addPrice(this.priceForm.value).subscribe(
        (res: any) => {
          console.log('Price added successfully:', res);
          this.getPrices(); // Refresh prices list after adding
          this.priceForm.reset();
        },
        (error) => {
          console.error('Error adding price:', error);
        }
      );
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

  editPrice(price: any): void {
    this.priceForm.patchValue({
      theatreId: price.theatreId._id,
      basePrice: price.basePrice,
      extraPricePerPerson: price.extraPricePerPerson,
    });
    this.addBtn = false;
    this.updateBtn = true;
  }

  updatePrice(): void {
    const priceId = this.priceForm.value._id;
    this.priceService.updatePrice(priceId, this.priceForm.value).subscribe(
      (res: any) => {
        console.log('Price updated successfully:', res);
        this.getPrices(); // Refresh prices list after updating
        this.priceForm.reset();
        this.addBtn = true;
        this.updateBtn = false;
      },
      (error) => {
        console.error('Error updating price:', error);
      }
    );
  }

  confirmDeletePrice(price: any): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete the price for ${price.theatreId.theatrename}?`
    );
    if (confirmDelete) {
      this.priceService.deletePrice(price._id).subscribe(
        (res: any) => {
          console.log('Price deleted successfully:', res);
          this.getPrices(); // Refresh prices list after deleting
        },
        (error) => {
          console.error('Error deleting price:', error);
        }
      );
    }
  }
}

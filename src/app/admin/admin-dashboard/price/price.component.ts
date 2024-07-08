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
  priceForm!: FormGroup;
  capatices: any;
  theatres: any;
  prices: any;
  theatresListWithId: any;

  capacityId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private theatreApi: TheatreService,
    private capacityApi: CapacityService,
    private priceApi: PriceService,
    private router: Router
  ) {
    this.priceForm = this.fb.group({
      theatreId: ['', Validators.required],
      capacityId: ['', Validators.required],
      price: [
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
    this.priceApi.getPrice().subscribe((res) => {
      this.prices = res;
      //console.log(res);
    });

    this.theatreApi.getTheatres().subscribe((res: any) => {
      this.theatres = res;
      // console.log(res);
    });

    this.priceApi.getTheatreById().subscribe((res: any) => {
      this.theatresListWithId = res;
      // console.log(res);
    });
  }

  addPrices(): void {
    if (this.priceForm.valid) {
      this.priceApi.addPrice(this.priceForm.value).subscribe((res: any) => {
        console.log(res);
      });
      this.priceForm.reset();
      this.router
        .navigateByUrl('/admin/home', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/admin/price']);
        });
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

  onTheatreChange(e: any) {
    const theatreId = e.target.value;
    console.log(theatreId);

    this.priceApi.getCapacityById(theatreId).subscribe((res: any) => {
      this.capatices = res;
      console.log(res, 'capacity with id');
    });
  }

  editPrices(_t64: any) {}
  updatePrices() {}

  confirmDeletePrices(_t64: any) {}
}

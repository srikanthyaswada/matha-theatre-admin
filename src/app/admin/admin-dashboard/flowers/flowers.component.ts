import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlowerService } from '../../../services/admin-services/flower.service';
import { MatIconModule } from '@angular/material/icon';
import { DeleteflowerComponent } from '../deleteflower/deleteflower.component';

@Component({
  selector: 'app-flowers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './flowers.component.html',
  styleUrl: './flowers.component.scss',
})
export class FlowersComponent {
  flowerForm!: FormGroup;

  selectedFile!: File;
  flowerList: any;
  flowerId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: FlowerService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.flowerForm = this.fb.group({
      flowerType: ['', [Validators.required]],
      flowerImage: ['', Validators.required],
      flowerPrice: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getFlowers().subscribe((res: any) => {
      this.flowerList = res;
      //console.log(res);
    });
  }
  getCakeImageUrl(flowerImg: any) {
    return `http://localhost:4000/uploads/${flowerImg}`;
  }
  seletedfile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile, 'file selected');
  }

  addFlower(): void {
    if (this.flowerForm.valid) {
      let formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('flowerType', this.flowerForm.value.flowerType);
      formData.append('flowerPrice', this.flowerForm.value.flowerPrice);
      this.apiService.addFlowers(formData).subscribe(
        (res) => {
          console.log('Flowers added successfully', res);
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/flower']);
            });
        },

        (error) => {
          console.error('Error while adding flower', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  editFlower(t: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(t);

    this.flowerId = t._id;
    this.flowerForm.patchValue({
      flowerType: t.flowerType,
      flowerPrice: t.flowerPrice,
      flowerImage: t.flowerImage,
    });
  }

  updateFlower() {
    this.apiService
      .editFlowers(this.flowerId, this.flowerForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/flower']);
      });
  }

  confirmDeleteFlower(t: any) {
    console.log(t, t._id);
    this.dialog.open(DeleteflowerComponent, {
      data: t,
    });
  }
}

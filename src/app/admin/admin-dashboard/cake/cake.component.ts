import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CakeService } from '../../../services/admin-services/cake.service';
import { DeletecakeComponent } from '../deletecake/deletecake.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.scss',
})
export class CakeComponent {
  cakeForm: FormGroup;

  selectedFile!: File;
  cakeList: any;
  cakeId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: CakeService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.cakeForm = this.fb.group({
      cakeName: ['', [Validators.required]],
      cakeImage: ['', Validators.required],
      cakePrice: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getCakes().subscribe((res: any) => {
      this.cakeList = res;
      //console.log(res);
    });
  }
  getCakeImageUrl(cakeImg: any) {
    return `http://localhost:4000/uploads/${cakeImg}`;
  }
  seletedfile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile, 'file selected');
  }

  addCake(): void {
    if (this.cakeForm.valid) {
      let formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('cakeName', this.cakeForm.value.cakeName);
      formData.append('cakePrice', this.cakeForm.value.cakePrice);
      this.apiService.addCakes(formData).subscribe(
        (res) => {
          console.log('Theatre added successfully', res);
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/cake']);
            });
        },

        (error) => {
          console.error('Error while adding cake', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  editCake(t: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(t);

    this.cakeId = t._id;
    this.cakeForm.patchValue({
      cakename: t.cakename,
      cakePrice: t.cakePrice,
      cakeImage: t.cakeImage,
    });
  }

  updateCake() {
    this.apiService
      .editCakes(this.cakeId, this.cakeForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/cake']);
      });
  }

  confirmDeleteCake(t: any) {
    console.log(t, t._id);
    this.dialog.open(DeletecakeComponent, {
      data: t,
    });
  }
}

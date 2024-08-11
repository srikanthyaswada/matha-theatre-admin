import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartypropsService } from '../../../services/admin-services/partyprops.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletephotosComponent } from '../deletephotos/deletephotos.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeletepartypropsComponent } from '../deletepartyprops/deletepartyprops.component';

@Component({
  selector: 'app-partyprops',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './partyprops.component.html',
  styleUrl: './partyprops.component.scss'
})
export class PartypropsComponent {
  partPropsForm!: FormGroup;

  selectedFile!: File;
  partyPropsList: any;
  partyId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: PartypropsService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.partPropsForm = this.fb.group({
      partyName: ['', [Validators.required]],
      partyImage: ['', Validators.required],
      partyPrice: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getPartyprops().subscribe((res: any) => {
      this.partyPropsList = res;
      console.log(res);
    });
  }
  getImageUrl(propImg: any) {
    return `http://localhost:4000/uploads/${propImg}`;
  }
  seletedfile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile, 'file selected');
  }

  addProps(): void {
    if (this.partPropsForm.valid) {
      let formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('partyName', this.partPropsForm.value.partyName);
      formData.append('partyPrice', this.partPropsForm.value.partyPrice);
      this.apiService.addPartyprops(formData).subscribe(
        (res) => {
          console.log('Props added successfully', res);
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/props']);
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

  editProps(t: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(t);

    this.partyId = t._id;
    this.partPropsForm.patchValue({
      partyName: t.partyName,
      partyPrice: t.partyPrice,
      partyImage: t.partyImage,
    });
  }

  updateProps() {
    this.apiService
      .editPartyprops(this.partyId, this.partPropsForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/props']);
      });
  }

  confirmDeleteProps(t: any) {
    console.log(t, t._id);
    this.dialog.open(DeletepartypropsComponent, {
      data: t,
    });
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from '../../../services/admin-services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeleteeventComponent } from '../deleteevent/deleteevent.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  celebrationForm: FormGroup;

  selectedFile!: File;
  celebrationList: any;
  celebrationId: any;
  addBtn: boolean = true;
  updateBtn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: EventService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.celebrationForm = this.fb.group({
      celebrationname: ['', [Validators.required, Validators.minLength(3)]],
      celebrationImage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getEvents().subscribe((res: any) => {
      this.celebrationList = res;
      //console.log(res);
    });
  }
  getCakeImageUrl(celebrationImg: any) {
    return `http://localhost:4000/uploads/${celebrationImg}`;
  }
  seletedfile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile, 'file selected');
  }

  addCelebration(): void {
    if (this.celebrationForm.valid) {
      let formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('celebrationname', this.celebrationForm.value.celebrationname);
      this.apiService.addEvents(formData).subscribe(
        (res) => {
          console.log('Celebration added successfully', res);
          this.router
            .navigateByUrl('/admin/home', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/admin/event']);
            });
        },

        (error) => {
          console.error('Error while adding event', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  editCelebration(t: any) {
    this.addBtn = false;
    this.updateBtn = true;
    console.log(t);

    this.celebrationId = t._id;
    this.celebrationForm.patchValue({
      celebrationname: t.celebrationname,
      celebrationImage: t.celebrationImage,
    });
  }

  updateCelebration() {
    this.apiService
      .editEvents(this.celebrationId, this.celebrationForm.value)
      .subscribe((res: any) => {
        console.log(res, 'updated');
      });
    this.router
      .navigateByUrl('/admin/home', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/admin/event']);
      });
  }

  confirmDeleteCelebration(t: any) {
    console.log(t, t._id);
    this.dialog.open(DeleteeventComponent, {
      data: t,
    });
  }
}

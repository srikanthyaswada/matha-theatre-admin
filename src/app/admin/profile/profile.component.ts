import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-services/admin.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private api: AdminService) {}
  ngOnInit(): void {
    this.api.profile().subscribe((res: any) => {
      console.log(res);
    });
  }
}

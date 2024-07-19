import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/admin-dashboard/dashboard/dashboard.component';
import { HomepageComponent } from './admin/admin-dashboard/homepage/homepage.component';
import { TheatreComponent } from './admin/admin-dashboard/theatre/theatre.component';
import { EventComponent } from './admin/admin-dashboard/event/event.component';
import { CakeComponent } from './admin/admin-dashboard/cake/cake.component';
import { PartypropsComponent } from './admin/admin-dashboard/partyprops/partyprops.component';
import { PhotoalbumComponent } from './admin/admin-dashboard/photoalbum/photoalbum.component';
import { FlowersComponent } from './admin/admin-dashboard/flowers/flowers.component';
import { SlotsComponent } from './admin/admin-dashboard/slots/slots.component';
import { CapacityComponent } from './admin/admin-dashboard/capacity/capacity.component';
import { PriceComponent } from './admin/admin-dashboard/price/price.component';
import { ProfileComponent } from './admin/profile/profile.component';

export const routes: Routes = [
  { path: '', title: 'admin-login', component: LoginComponent },
  { path: 'login', title: 'admin-login', component: LoginComponent },
  {
    path: 'admin',
    title: 'admin-dashboard',
    component: DashboardComponent,
    children: [
      { path: '', title: 'home', component: HomepageComponent },
      { path: 'home', title: 'home', component: HomepageComponent },
      { path: 'theatre', title: 'theatre', component: TheatreComponent },
      { path: 'event', title: 'event', component: EventComponent },
      { path: 'cake', title: 'cake', component: CakeComponent },
      { path: 'props', title: 'props', component: PartypropsComponent },
      { path: 'photo', title: 'photos', component: PhotoalbumComponent },
      { path: 'flower', title: 'flower', component: FlowersComponent },
      { path: 'slot', title: 'slot', component: SlotsComponent },
      { path: 'capacity', title: 'capacity', component: CapacityComponent },
     // { path: 'price', title: 'price', component: PriceComponent },
      { path: 'profile', title: 'profile', component: ProfileComponent },
    ],
  },
];

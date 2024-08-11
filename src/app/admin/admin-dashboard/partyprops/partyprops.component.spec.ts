import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartypropsComponent } from './partyprops.component';

describe('PartypropsComponent', () => {
  let component: PartypropsComponent;
  let fixture: ComponentFixture<PartypropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartypropsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartypropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

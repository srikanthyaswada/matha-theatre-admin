import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteslotsComponent } from './deleteslots.component';

describe('DeleteslotsComponent', () => {
  let component: DeleteslotsComponent;
  let fixture: ComponentFixture<DeleteslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteslotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

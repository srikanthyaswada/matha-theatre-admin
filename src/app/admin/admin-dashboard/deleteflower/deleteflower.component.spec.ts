import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteflowerComponent } from './deleteflower.component';

describe('DeleteflowerComponent', () => {
  let component: DeleteflowerComponent;
  let fixture: ComponentFixture<DeleteflowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteflowerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteflowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

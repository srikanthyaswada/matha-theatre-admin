import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecakeComponent } from './deletecake.component';

describe('DeletecakeComponent', () => {
  let component: DeletecakeComponent;
  let fixture: ComponentFixture<DeletecakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletecakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletecakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

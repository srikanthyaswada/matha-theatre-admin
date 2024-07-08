import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetheatreComponent } from './deletetheatre.component';

describe('DeletetheatreComponent', () => {
  let component: DeletetheatreComponent;
  let fixture: ComponentFixture<DeletetheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletetheatreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletetheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

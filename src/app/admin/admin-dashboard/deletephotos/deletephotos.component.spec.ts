import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletephotosComponent } from './deletephotos.component';

describe('DeletephotosComponent', () => {
  let component: DeletephotosComponent;
  let fixture: ComponentFixture<DeletephotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletephotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletephotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepartypropsComponent } from './deletepartyprops.component';

describe('DeletepartypropsComponent', () => {
  let component: DeletepartypropsComponent;
  let fixture: ComponentFixture<DeletepartypropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletepartypropsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletepartypropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

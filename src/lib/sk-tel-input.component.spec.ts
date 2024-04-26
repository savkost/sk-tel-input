import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkTelInputComponent } from './sk-tel-input.component';

describe('SkTelInputComponent', () => {
  let component: SkTelInputComponent;
  let fixture: ComponentFixture<SkTelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkTelInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

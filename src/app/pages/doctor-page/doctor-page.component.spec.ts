import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPageComponent } from './doctor-page.component';

describe('DoctorPageComponent', () => {
  let component: DoctorPageComponent;
  let fixture: ComponentFixture<DoctorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

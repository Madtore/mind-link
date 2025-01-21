import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistListComponent } from './psychologist-list.component';

describe('PsychologistListComponent', () => {
  let component: PsychologistListComponent;
  let fixture: ComponentFixture<PsychologistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsychologistListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychologistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

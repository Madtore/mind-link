import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationComponent } from './innovation.component';

describe('InnovationComponent', () => {
  let component: InnovationComponent;
  let fixture: ComponentFixture<InnovationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

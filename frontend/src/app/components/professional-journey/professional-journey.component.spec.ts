import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalJourneyComponent } from './professional-journey.component';

describe('ProfessionalJourneyComponent', () => {
  let component: ProfessionalJourneyComponent;
  let fixture: ComponentFixture<ProfessionalJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuilderComponent } from './card-builder.component';

describe('CardBuilderComponent', () => {
  let component: CardBuilderComponent;
  let fixture: ComponentFixture<CardBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

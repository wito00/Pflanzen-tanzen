import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfoCardComponentComponent } from './plant-info-card-component.component';

describe('PlantInfoCardComponentComponent', () => {
  let component: PlantInfoCardComponentComponent;
  let fixture: ComponentFixture<PlantInfoCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantInfoCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfoCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

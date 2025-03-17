import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCardModuleComponent } from './data-card-module.component';

describe('DataCardModuleComponent', () => {
  let component: DataCardModuleComponent;
  let fixture: ComponentFixture<DataCardModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCardModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCardModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

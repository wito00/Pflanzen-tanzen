import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryGraphComponentComponent } from './history-graph-component.component';

describe('HistoryGraphComponentComponent', () => {
  let component: HistoryGraphComponentComponent;
  let fixture: ComponentFixture<HistoryGraphComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryGraphComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryGraphComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

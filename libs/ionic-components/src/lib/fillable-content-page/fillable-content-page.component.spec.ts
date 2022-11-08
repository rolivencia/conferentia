import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillableContentPageComponent } from './fillable-content-page.component';

describe('FillableContentPageComponent', () => {
  let component: FillableContentPageComponent;
  let fixture: ComponentFixture<FillableContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FillableContentPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FillableContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

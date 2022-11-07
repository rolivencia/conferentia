import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeynoteSpeakersPage } from './keynote-speakers.page';

describe('KeynoteSpeakersPage', () => {
  let component: KeynoteSpeakersPage;
  let fixture: ComponentFixture<KeynoteSpeakersPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [KeynoteSpeakersPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(KeynoteSpeakersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

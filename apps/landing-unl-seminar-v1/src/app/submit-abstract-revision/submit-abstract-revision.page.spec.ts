import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmitAbstractRevisionPage } from './submit-abstract-revision.page';

describe('SubmitAbstractRevisionPage', () => {
  let component: SubmitAbstractRevisionPage;
  let fixture: ComponentFixture<SubmitAbstractRevisionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitAbstractRevisionPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitAbstractRevisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

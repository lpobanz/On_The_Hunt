import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateObjectivesPage } from './create-objectives.page';

describe('CreateObjectivesPage', () => {
  let component: CreateObjectivesPage;
  let fixture: ComponentFixture<CreateObjectivesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObjectivesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateObjectivesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

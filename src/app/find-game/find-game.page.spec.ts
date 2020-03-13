import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindGamePage } from './find-game.page';

describe('FindGamePage', () => {
  let component: FindGamePage;
  let fixture: ComponentFixture<FindGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameHomePage } from './game-home.page';

describe('GameHomePage', () => {
  let component: GameHomePage;
  let fixture: ComponentFixture<GameHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

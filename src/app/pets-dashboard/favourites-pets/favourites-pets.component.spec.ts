import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesPetsComponent } from './favourites-pets.component';

describe('FavouritesPetsComponent', () => {
  let component: FavouritesPetsComponent;
  let fixture: ComponentFixture<FavouritesPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

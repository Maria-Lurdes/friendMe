import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesPetsComponent } from './favourites-pets.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AlertService} from "../../shared/services/alert.service";
import {initializeApp} from "firebase/app";
import {firebase} from "../../../environments/environment";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FavouritesPetsComponent', () => {
  let component: FavouritesPetsComponent;
  let fixture: ComponentFixture<FavouritesPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritesPetsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AlertService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(FavouritesPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCardComponent } from './pet-card.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";

describe('PetCardComponent', () => {
  let component: PetCardComponent;
  let fixture: ComponentFixture<PetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetCardComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

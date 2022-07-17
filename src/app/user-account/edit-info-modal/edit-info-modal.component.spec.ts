import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoModalComponent } from './edit-info-modal.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../shared/services/alert.service";
import {RouterTestingModule} from "@angular/router/testing";
import {initializeApp} from "firebase/app";
import {firebase} from "../../../environments/environment";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EditInfoModalComponent', () => {
  let component: EditInfoModalComponent;
  let fixture: ComponentFixture<EditInfoModalComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoModalComponent ],
      imports: [MatDialogModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
          AlertService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(EditInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

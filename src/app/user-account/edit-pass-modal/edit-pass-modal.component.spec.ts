import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPassModalComponent } from './edit-pass-modal.component';
import {AlertService} from "../../shared/services/alert.service";
import {RouterTestingModule} from "@angular/router/testing";
import {initializeApp} from "firebase/app";
import {firebase} from "../../../environments/environment";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EditPassModalComponent', () => {
  let component: EditPassModalComponent;
  let fixture: ComponentFixture<EditPassModalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPassModalComponent ],
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
    fixture = TestBed.createComponent(EditPassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PetInfoComponent } from "./pet-info.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertService } from "../../shared/services/alert.service";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatProgressBarModule } from "@angular/material/progress-bar";

describe("PetInfoComponent", () => {
  let component: PetInfoComponent;
  let fixture: ComponentFixture<PetInfoComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy("close"),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetInfoComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatProgressBarModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        AlertService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

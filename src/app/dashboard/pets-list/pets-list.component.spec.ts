import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PetsListComponent } from "./pets-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertService } from "../../shared/services/alert.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FilterPipe } from "../../shared/filter.pipe";
import { initializeApp } from "firebase/app";
import { firebase } from "../../../environments/environment";

describe("PetsListComponent", () => {
  let component: PetsListComponent;
  let fixture: ComponentFixture<PetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetsListComponent, FilterPipe],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AlertService],
    }).compileComponents();
  }));

  beforeEach(() => {
    initializeApp(firebase);
    fixture = TestBed.createComponent(PetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

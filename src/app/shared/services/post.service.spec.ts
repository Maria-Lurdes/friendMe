import { PostService } from "./post.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";

describe("PostService", () => {
  let httpMock: HttpTestingController;
  let testService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    testService = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("get pet by id", () => {
    const post = {
      age: 145,
      description:
        "Tolsona also known as Tiny which is what she response to, is a sweet sweet girl...she is very affectionate. She gets along great with all dogs. She enjoys playing, rough housing , and chilling with you. Tolsona is NOT A CAT girl. She has gone after ours many times. Does great on car rides. Walks calmly on a leash. House and kennel trained, great with kids.",
      name: "Tolsona",
      sex: "female",
      type: "dog",
      weight: 7,
    };

    testService.getById("-N9f_QFh_emE9IVfX7jf").subscribe((res) => {
      expect(res.name).toEqual(post.name);
      expect(res.description).toEqual(post.description);
      expect(res.age).toEqual(post.age);
    });

    const req = httpMock.expectOne(
      `${environment.fvDbUrl}/posts/-N9f_QFh_emE9IVfX7jf.json`
    );
    expect(req.request.method).toEqual("GET");
    req.flush(post);

    httpMock.verify();
  });
});

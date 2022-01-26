import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Post} from "../interfaces";
import {environment} from "../../../environments/environment";
import { map } from 'rxjs/operators';
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class PostService {
    constructor(private http: HttpClient) {
    }

    createPost(post: Post): Observable<Post>{
        return this.http.post(`${environment.fvDbUrl}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                }
            }))
    }

}

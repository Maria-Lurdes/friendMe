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

    getAll(): Observable<Post[]>{
        return this.http.get(`${environment.fvDbUrl}/posts.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))
            }))
    }

    getById(id: string): Observable<Post>{
        return this.http.get<Post>(`${environment.fvDbUrl}/posts/${id}.json`)
            .pipe(map((post: Post) => {
                return {
                    ...post,
                    id,
                }
            }))
    }



    remove(id: string): Observable<void>{
        return this.http.delete<void>(`${environment.fvDbUrl}/posts/${id}.json`)
    }

    update(post: Post): Observable<Post>{
        return this.http.patch<Post>(`${environment.fvDbUrl}/posts/${post.id}.json`, post)
    }

}

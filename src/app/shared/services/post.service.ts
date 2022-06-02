import {HttpClient} from "@angular/common/http";
import {Observable, Subject, Subscription} from "rxjs";
import {CatQuote, ContactForm, FbCreateResponse, Post} from "../interfaces";
import {environment} from "../../../environments/environment";
import {map} from 'rxjs/operators';
import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class PostService {
    constructor(private http: HttpClient) {
    }

    public petPostsArray = new Subject<Post[]>();

    createPost(post: Post): Observable<Post>{
        return this.http.post(`${environment.fvDbUrl}/posts.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                }
            }))
    }

    getAll(): Subscription{
        return this.http.get(`${environment.fvDbUrl}/posts.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                    }))
            }))
            .subscribe(data => {
                this.petPostsArray.next(data);
            })
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

    updatePost(id: string, post: Post): Observable<Post>{
        return this.http.patch<Post>(`${environment.fvDbUrl}/posts/${id}.json`, post)
    }

    saveContactForm(contact: ContactForm): Observable<ContactForm>{
        return this.http.post<ContactForm>(`${environment.fvDbUrl}/contacts.json`, contact);
    }

    getRandomFact(): Observable<CatQuote[]> {
        return this.http.get<CatQuote[]>(`https://cat-fact.herokuapp.com/facts`);
    }

}

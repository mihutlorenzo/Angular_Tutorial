import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePosts(postData: Post) {
    // Send Http request
    this.http
    .post< {name: string}>(
      'https://http-01-start-4a721.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<Observable<{ [key: string]: Post}>>( 'https://http-01-start-4a721.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({ 'Custom-Header': 'Hello'}),
      params: searchParams,
      responseType: 'json'
    })
    .pipe(
      map(responseData => {
      const postArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key], id: key});
        }
      }
      return postArray;
    }),
    catchError(errorRes => {
      // Send to analytics server
      return throwError(errorRes);
    }));
  }

  deletePosts() {
    return this.http.delete(
      'https://http-01-start-4a721.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
    ).pipe(
        tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }

}


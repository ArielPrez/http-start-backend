import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  errorSubj = new Subject<string>();
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http.post<{ name: string }>(
      'https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response'
      }
      ).subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.errorSubj.next(error.error.error);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
    .get('https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header':'Hello!!!'}),
          params: searchParams
        }
    ).pipe(
      map(
        (arrayData: {[key: string]: Post }) => {
          const postsArray: Post[] = [];
          for (const key in arrayData) {
            if (arrayData.hasOwnProperty(key)) {
              postsArray.push({ ...arrayData[key], id: key});
            }
          }
          return postsArray;
        }
      ),
      catchError((errorRes) => {
        // Send to analytics server
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http
    .delete('https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json',
    {
      observe: 'events'
    }
    ).pipe(
      tap((event) => {
        console.log(event);
        if(event.type === HttpEventType.UploadProgress) {
          console.log('===> '+ event.type);
        }
        if(event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}

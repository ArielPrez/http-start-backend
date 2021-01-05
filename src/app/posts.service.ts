import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
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
      postData).subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.errorSubj.next(error.error.error);
        }
      );
  }

  fetchPosts() {
    return this.http
    .get('https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header':'Hello!!!'})
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
    .delete('https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json');
  }
}

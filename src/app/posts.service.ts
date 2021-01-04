import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http.post<{ name: string }>(
      'https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json',
      postData).subscribe(
        (responseData) => {
          console.log(responseData);
        }
      );
  }

  fetchPosts() {
    return this.http
    .get('https://recipestore-2020ap-default-rtdb.firebaseio.com/posts.json')
    .pipe(
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
      )
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
              private postServ: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postServ.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
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
    )
    .subscribe(
      (posts) => {
        // console.log(posts[1]);
        this.isFetching = false;
        this.loadedPosts = posts;
      }
    );
  }
}

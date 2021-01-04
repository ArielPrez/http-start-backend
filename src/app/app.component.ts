import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  errors: any[] = [''];

  constructor(private http: HttpClient,
              private postServ: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postServ.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postServ.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.isFetching = false;
        this.errors = [];
        this.loadedPosts = posts;
      },
      error => {
        // All these are error from the FireBase API,
        // In others API it might vary the structure.
        this.errors[0] = error.error.error;
        this.errors[1] = 'Message: ' + error.message;
        this.errors[2] = 'Status: ' + error.status;
        // console.log(this.errors);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postServ.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    );
  }

}

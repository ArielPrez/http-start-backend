import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = '';
  private errorSub: Subscription;

  constructor(private http: HttpClient,
              private postServ: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postServ.errorSubj.subscribe(
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
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
        this.error = '';
        this.loadedPosts = posts;
      },
      error => {
        // All these are error from the FireBase API,
        // In others API it might vary the structure.
        // this.error = error.error.error;
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

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


}

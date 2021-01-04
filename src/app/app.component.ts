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
        this.loadedPosts = posts;
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

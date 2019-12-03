import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
     this.error = error.message;
     this.isFetching = false;
    });
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData);
  }

  onFetchPosts() {
       // Send Http request
       this.isFetching = true;
       this.postService.fetchPosts().subscribe(posts => {
         this.isFetching = false;
         this.loadedPosts = posts;
       }, error => {
        this.error = error.message;
        this.isFetching = false;
       });
  }

  onClearPosts() {
   this.postService.deletePosts().subscribe(() => {
     this.loadedPosts = [];
   });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}

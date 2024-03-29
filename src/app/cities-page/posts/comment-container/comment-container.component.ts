import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css'],
})
export class CommentContainerComponent implements OnInit {
  @ViewChild('postsForm') formElement!: ElementRef;

  posts = this.postService.getPosts();
  formData: any = {
    id: '',
    postId: '',
    username: '',
    userImage: '',
    title: '',
    desc: '',
    createdAt: new Date().toLocaleDateString(),
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {}

  submitForm(formData: NgForm): void {
    this.formData.id = this.posts[this.posts.length - 1].id + 1;
    this.activeRoute.paramMap.subscribe((params) => {
      this.formData.postId = this.posts.find((post) => {
        let paramId: string = params.get('id') || '';
        return post.id === parseInt(paramId);
      })?.id;
    });

    this.formData = { ...formData };
    this.postService.addPost(this.formData);
    console.log(this.formData);
    // close modal
    this.closeModal();
  }

  closeModal(): void {
    this.formData = {
      id: '',
      postId: '',
      username: '',
      userImage: '',
      title: '',
      desc: '',
    };
  }

  showPosts() {
    console.log(this.postService.getPosts());
  }
}

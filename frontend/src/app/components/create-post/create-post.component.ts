import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  postContent: string = '';
  userId: string = '';
  isPending: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router
  ) {
    this.userId = sessionStorage.getItem('userId') || '';
  }

  createPost() {
    this.isPending = true;
    this.postService.createPost(this.userId, this.postContent).subscribe({
      next: (response) => {
        // console.log('Post created successfully:', response);
        this.isPending = false;
        this.router.navigate(['/social-post']);
      },
      error: (error) => {
        this.isPending = false;
        console.error('Error creating post:', error);
      },
    });
  }

}

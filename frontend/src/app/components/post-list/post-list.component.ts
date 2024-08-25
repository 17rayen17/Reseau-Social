import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  isLoading = true;
  errorMsg: string = '';
  selectedPostIndex: number | null = null;

  ngOnInit(): void {
    this.loadPosts();
  }
  constructor(private postService: PostService) {}

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching posts', error);
        this.errorMsg = 'An error occurred while fetching posts.';
        this.isLoading = false;
      },
    });
  }

  toggleLike(postId: string, postIndex: number) {
    this.postService.toggleLike(postId).subscribe({
      next: (response) => {
        const updatedPost = response.post;
        this.posts[postIndex] = updatedPost; 
      },
      error: (error) => {
        console.error('Error toggling like:', error);
      }
    });
  }

  deletePost(postId: string, postIndex: number) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        // Remove the post from the local array
        this.posts.splice(postIndex, 1);
      },
      error: (error) => {
        console.error('Error deleting post:', error);
        this.errorMsg = 'Failed to delete post.';
      }
    });
  }

  toggleMenu(postIndex: number) {
    this.selectedPostIndex = this.selectedPostIndex === postIndex ? null : postIndex;
  }
}

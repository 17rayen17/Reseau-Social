import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/post/getAllPost`, { headers });
  }
  createPost(user: string, content: string): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const postData = { user, content };
    return this.http.post<any>(`${this.apiUrl}/post/createPost`, postData, {
      headers,
    });
  }
  toggleLike(postId: string): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = sessionStorage.getItem('userId') || '';

    return this.http.post<any>(
      `${this.apiUrl}/post/toggleLike/${postId}`,
      { userId }, 
      { headers }
    );
  }

  deletePost(postId: string): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/post/deletePost/${postId}`, { headers });
  }

  // CRUD Comment
  addComment(postId: string, commentData: any): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/comment/${postId}`, commentData, { headers });
  }

  
  updateComment(commentId: string, commentData: any): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/comment/${commentId}`, commentData, { headers });
  }

  
  removeComment(commentId: string): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/comment/${commentId}`, { headers });
  }
  //  ****************************************************************
}

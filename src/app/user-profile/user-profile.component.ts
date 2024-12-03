import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  token: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.http.get<any[]>('https://movieverse-902fc605dee3.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe((movies) => {
      this.favoriteMovies = movies.filter(movie => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  updateProfile(): void {
    this.http.put(`https://movieverse-902fc605dee3.herokuapp.com/users/${this.user._id}`, {
      Username: this.user.Username,
      Password: this.user.Password,
      Email: this.user.Email,
      Birthday: this.user.Birthday
    }, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe(updatedUser => {
      this.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.snackBar.open('Profile updated successfully', 'Close', {
        duration: 3000,
      });
    });
  }

  removeFavorite(movieId: string): void {
    this.http.delete(`https://movieverse-902fc605dee3.herokuapp.com/users/${this.user._id}/favorites/${movieId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movieId);
        localStorage.setItem('user', JSON.stringify(user));
        this.snackBar.open('Movie removed from favorites', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deregister(): void {
    this.http.delete(`https://movieverse-902fc605dee3.herokuapp.com/users/${this.user._id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe(() => {
      localStorage.clear();
      this.snackBar.open('User deregistered successfully', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/login']);
    });
  }
}
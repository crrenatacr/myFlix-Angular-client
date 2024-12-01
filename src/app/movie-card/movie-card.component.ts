import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Service to interact with the API
import { Router } from '@angular/router'; // Service for page navigation
import { MatDialog } from '@angular/material/dialog'; // Service to open dialogs
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // Variable to store movies
  isAuthenticated: boolean = false; // Variable to check if the user is authenticated

  constructor(
    private fetchApiData: FetchApiDataService, // Service to fetch movies from the API
    private router: Router, // Service to navigate the user between pages
    public dialog: MatDialog // MatDialog service to open dialog boxes
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('token');
    if (this.isAuthenticated) {
      this.getMovies();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        if (resp && Array.isArray(resp)) {
          this.movies = resp; // Store the fetched movies
          console.log('Movies fetched:', this.movies); // Log the movies to check the data
        } else {
          console.error('Invalid response format');
        }
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px',
      data: {
        name: genre.Name,
        description: genre.Description
      }
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px',
      data: {
        name: director.Name,
        bio: director.Bio,
        birth: director.Birth,
        death: director.Death || 'N/A'
      }
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '400px',
      data: {
        title: movie.Title,
        description: movie.Description
      }
    });
  }

  checkIfFavourite(movieId: string): void {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('User ID is missing');
      return; // Stop execution if userId is missing
    }

    this.fetchApiData.getFavoriteMovies(userId!).subscribe({
      next: (favorites: string[]) => {
        const movie = this.movies.find(m => m._id === movieId);
        if (movie) {
          movie.isFavourite = favorites.includes(movieId); // Update the favourite status of the movie
        }
      },
      error: (err) => {
        console.error('Error checking favourites:', err);
      }
    });
  }

  toggleFavourite(movie: any): void {
    const userId = localStorage.getItem('userId');
    
    // Check if userId is present
    if (!userId) {
      console.error('User ID is missing');
      return; // Stop execution if userId is missing
    }
    
    // Check if movie._id is present
    if (!movie._id) {
      console.error('Movie ID is missing');
      return; // Stop execution if movie ID is missing
    }

    // Check if the movie is already a favorite and handle the toggling accordingly
    if (movie.isFavourite) {
      this.fetchApiData.removeFromFavourites(userId!, movie._id).subscribe({
        next: () => {
          movie.isFavourite = false; // Remove from favourites
        },
        error: (err) => {
          console.error('Error removing from favourites:', err);
        }
      });
    } else {
      // Add movie to favorites
      this.fetchApiData.addToFavourites(userId!, movie._id).subscribe({
        next: (response) => {
          console.log('Successfully added to favourites:', response); // Log to verify API response
          movie.isFavourite = true; // Mark the movie as favourite
        },
        error: (err) => {
          console.error('Error adding to favourites:', err);
        }
      });
    }
  }
}

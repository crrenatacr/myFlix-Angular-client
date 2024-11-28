import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';  // Service to interact with the API
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
    // Check if the user is authenticated by the presence of the token in localStorage
    this.isAuthenticated = !!localStorage.getItem('token');

    if (this.isAuthenticated) {
      // If authenticated, load movies
      this.getMovies();
    } else {
      // Otherwise, navigate to the login page
      this.router.navigate(['/login']);
    }
  }

  // Function to fetch all movies from the API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      if (resp && Array.isArray(resp)) {
        this.movies = resp; // Store the fetched movies
        console.log('Movies fetched:', this.movies);  // Log the movies to check the data
      } else {
        console.error('Invalid response format');
      }
    }, error => {
      console.error('Error fetching movies:', error);
      // Handle errors here if needed (e.g., show an error message)
    });
  }

  // Add movie to favorite
  addToFavorites(movieId: string): void {
    const userId = localStorage.getItem('userId') ?? ''; // Get stored userId
    this.fetchApiData.addToFavourites(userId, movieId).subscribe((response: any) => {
      console.log('Movie added to favorites:', response);
    }, error => {
      console.error('Error adding movie to favorites:', error);
    });
  }

  // Function to open the Genre Dialog
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '400px', // Dialog width
      data: {
        name: genre.Name, // Pass the genre name to the dialog
        description: genre.Description // Pass the genre description to the dialog
      }
    });
  }

  // Function to open the Director Dialog
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '400px', // Dialog width
      data: {
        name: director.Name, // Pass the director's name to the dialog
        bio: director.Bio, // Pass the director's bio to the dialog
        birth: director.Birth, // Pass the director's birth year to the dialog
        death: director.Death || 'N/A' // Pass the director's death year or 'N/A' if empty
      }
    });
  }

  // Function to open the Synopsis Dialog
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '400px', // Dialog width
      data: {
        title: movie.Title, // Pass the movie title to the dialog
        description: movie.Description, // Pass the movie description to the dialog
      }
    });
  }
}

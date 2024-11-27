import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';  // Service to interact with the API
import { Router } from '@angular/router'; // Service for page navigation

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
    private router: Router // Service to navigate the user
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
    // Fetch movies from the API
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      if (resp && Array.isArray(resp)) {
        // If the response is valid and an array, store the movies
        this.movies = resp;
        console.log('Movies fetched:', this.movies);  // Log the movies to check the data
      } else {
        console.error('Invalid response format');
      }
    }, error => {
      console.error('Error fetching movies:', error);
      // Handle errors here if needed (e.g., show an error message)
    });
  }
}

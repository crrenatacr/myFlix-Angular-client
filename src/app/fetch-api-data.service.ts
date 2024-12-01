import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the API URL for the backend server
const apiUrl = 'https://movieverse-902fc605dee3.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Method to handle user registration via POST request to the API
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}users/register`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Method to handle user login via POST request to the API
  public userLogin(credentials: any): Observable<any> {
    return this.http.post(`${apiUrl}login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get all movies from the API with Authorization token
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}movies/`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get a single movie by its ID
  public getMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get movies by a specific genre
  public getGenreMovies(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}movies/genres/${genre}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get movies by a specific director
  public getDirectorMovies(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}movies/directors/${director}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get user information
  public getUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}users/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Method to update user data
  public updateUser(userData: any): Observable<any> {
    return this.http.put(apiUrl + `/user/${userData.id}`, userData,
      {headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      })}).pipe(
          map(this.extractResponseData), catchError(this.handleError)
      );
  }

  // Method to add a movie to favourite movies for a user
  public addToFavourites(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    // Checking if the token exists
    if (!token) {
      console.error('Token is missing');
      return throwError(() => new Error('Token is missing'));
    }
    
    // Verify if userId is correct
    if (!userId || !movieId) {
      console.error('User ID or Movie ID is missing');
      return throwError(() => new Error('User ID or Movie ID is missing'));
    }
    
    return this.http.post<any>(
      `${apiUrl}users/${userId}/favorites`,
      { movieId },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to remove a movie from favourite movies for a user
  public removeFromFavourites(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(
      `${apiUrl}users/${userId}/favorites/${movieId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get favorite movies 
  public getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}users/${userId}/favorites`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // Log error details more clearly
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Private method to extract response data, simplifying the process
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}

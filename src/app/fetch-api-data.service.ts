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
    console.log(userDetails);  // Logging user details for debugging
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError) 
    );
  }

  // Method to handle user login via POST request to the API
  public userLogin(credentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', credentials).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get all movies from the API with Authorization token
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  
      })
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
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError) 
    );
  }

  // Method to get the director information
  public getDirector(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}directors/${id}`, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get genre information
  public getGenre(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}genres/${id}`, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      })
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
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to get favourite movies for a user
  public getFavouriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}users/${userId}/favorites`, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to add a movie to favourite movies for a user
  public addToFavourites(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${apiUrl}users/${userId}/favorites`, { movieId }, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to edit user details
  public editUser(id: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${apiUrl}users/${id}`, userDetails, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Method to delete a user
  public deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(`${apiUrl}users/${id}`, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,  
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Method to delete a movie from the favourite movies
  public removeFromFavourites(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(`${apiUrl}users/${userId}/favorites/${movieId}`, {  
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, 
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Private method to handle errors from API requests
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
  }
  //Newer method for throwError
  return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Private method to extract response data, simplifying the process/Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {}; 
  }
}


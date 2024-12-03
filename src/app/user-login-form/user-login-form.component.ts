import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  login(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        // Save userId in localStorage to use it in further requests
        localStorage.setItem('userId', response.user._id);  // Adding userId to localStorage
        
        // Logic for a successful user login goes here!
        this.dialogRef.close(); // This will close the modal/dialog on success!
        this.snackBar.open('User logged in!', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        // Show error message
        console.log(error);
        this.snackBar.open('User login failed!', 'OK', { duration: 2000 });
      },
      complete: () => {
        // Optional: Add logic for completion, if needed
      },
    });
  }
}

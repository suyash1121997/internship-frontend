import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Implement your login logic here, e.g., call an API
    // Mocked authentication for demonstration purposes
    if (username === 'user' && password === 'user') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  signup(username: string, password: string): boolean {
    // Implement your signup logic here, e.g., call an API
    // Mocked registration for demonstration purposes
    // Return true if registration is successful, otherwise false
    return true;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }
}

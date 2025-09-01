import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export type JwtPayload = {
  sub: string;
  roles: string[];
  exp: number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_KEY = 'token';

  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getUserData(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Erro ao decodificar token', error);
      return null;
    }
  }

  public getUserName(): string | null {
    return this.getUserData()?.sub ?? null;
  }

  public getUserRoles(): string[] {
    return this.getUserData()?.roles ?? [];
  }

  public isTokenExpired(): boolean {
    const exp = this.getUserData()?.exp;
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

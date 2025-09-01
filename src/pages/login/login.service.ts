import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

export type Credenciais = { login: string; password: string };
export type LoginResponse = { token: string };

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #http = inject(HttpClient);
  #URL_LOGIN = `http://localhost:8080/auth/login`;

  public logar(credentials: Credenciais): Observable<LoginResponse> {
    return this.#http.post<LoginResponse>(this.#URL_LOGIN, credentials);
  }
}

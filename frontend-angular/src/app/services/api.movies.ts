import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMovieService {

  private baseUrl = "http://127.0.0.1:8000/movies/"
  private _httpClient = inject(HttpClient);

  public getAll(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}getAll`)
  }

  public getById(id: string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}getById/${id}`)
  }

  public create(data: any): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}create`, data)
  }

  public deleteById(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}deleteById/${id}`)
  }

  public updateById(data: any, id: string): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}updateById/${id}`, data)
  }
}
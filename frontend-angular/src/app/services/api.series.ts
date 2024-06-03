import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSeriesService {

  private baseUrl = "http://127.0.0.1:8000/series/"
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

  public createSeasons(data: any): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}createSeasons`, data)
  }

  public createVideos(data: any): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}createVideos`, data)
  }

  public deleteById(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}deleteById/${id}`)
  }

  public updateSeriesById(data: any, id: string): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}updateSeriesById/${id}`, data)
  }

  public updateSeasonById(data: any, id: string): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}updateSeasonById/${id}`, data)
  }

  public updateVideosById(data: any, id: string): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}updateVideosById/${id}`, data)
  }

  public deleteSeasonById(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}deleteSeasonById/${id}`);
  }

  public deleteVideosBySeason(id: string): Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}deleteVideosBySeason/${id}`);
  }
}
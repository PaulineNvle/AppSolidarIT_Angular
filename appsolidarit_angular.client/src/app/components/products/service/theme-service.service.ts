import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ITheme } from '../homepage/ITheme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private urlBase = "http://localhost:5033/api/Theme"
  constructor(private http: HttpClient) { }


  //GET
  getTheme(): Observable<ITheme[]> {
    return this.http
      .get<ITheme[]>(this.urlBase)
      .pipe(map(response => response as ITheme[]));
  }

  //GET BY ID
  getThemeByid(id: number): Observable<ITheme> {
    return this.http
      .get<ITheme>(`${this.urlBase}/${id}`);
  }

  //CREATE
  addTheme(Theme: ITheme): Observable<any> {
    return this.http
      .post<ITheme>(this.urlBase, (Theme));
  }

  //UPDATE
  editTheme(Theme: ITheme): Observable<any> {
    return this.http
      .put<ITheme[]>(`${this.urlBase}/${Theme.id}`, Theme);
  }

  //DELETE
  deleteTheme(Theme: ITheme): Observable<ITheme> {
    if (confirm("Etes-vous sure de vouloir supprimer cette thématique?")) {

      this.http
        .delete<ITheme>(`${this.urlBase}/${Theme.id}`)
    }
    return of(Theme);
  }

  //DELETE BY ID
  deleteThemeById(id: number): Observable<ITheme> {
    if (confirm("Etes-vous sure de vouloir supprimer cette thématique?")) {

      console.log(`${this.urlBase}/${id}`)
      return this.http
        .delete<ITheme>(`${this.urlBase}/${id}`)

    } else {
      return this.http.get<ITheme>(`${this.urlBase}/${id}`);
      console.log('error');
    }
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "init", loadComponent: () => import('./pages/init/init.component').then(c => c.InitComponent),},
    {path: "series", loadComponent: () => import('./pages/series/series.component').then(c => c.SeriesComponent),},
    {path: "movies", loadComponent: () => import('./pages/movies/movies.component').then(c => c.MoviesComponent),},
    {path: "series/:id", loadComponent: () => import('./pages/series/series.component').then(c => c.SeriesComponent),},
    {path: "movies/:id", loadComponent: () => import('./pages/movies/movies.component').then(c => c.MoviesComponent),},
    {path: "watchSeries/:id", loadComponent: () => import('./pages/watch-series/watch-series.component').then(c => c.WatchSeriesComponent),},
    {path: "watchMovies/:id", loadComponent: () => import('./pages/watch-movies/watch-movies.component').then(c => c.WatchMoviesComponent),},
    {path: "admin", loadComponent: () => import('./pages/admin/admin.component').then(c => c.AdminComponent)},
    {path: "**", redirectTo:"init", pathMatch: "full"}
]; 
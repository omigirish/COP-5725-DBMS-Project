import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbaccessService {
  private apiUrl = 'http://127.0.0.1:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getTotalTuples(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/total_tuples');
  }

  getTripsData(state: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/get_trip_data?state=' + state);
  }

  getAccidentsEveryYear(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/total_accidents_per_year');
  }

  getAccidentsCount(state: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/accident_count/' + state);
  }

  getWeatherCount(state: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/weather_count/' + state);
  }

  averageImpactDuration(state: String): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/average-impact-duration/' + state);
  }

  fetchData(
    startDate: string,
    endDate: string,
    state: string
  ): Observable<any> {
    const requestData = {
      start_date: startDate,
      end_date: endDate,
      state: state,
    };

    // Add any required headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(
      this.apiUrl + '/deviation_query',
      requestData,
      httpOptions
    );
  }
}

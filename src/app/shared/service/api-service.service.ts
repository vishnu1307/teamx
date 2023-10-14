import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }
  createRecord(payload:any) {
    return this.http.post(`http://localhost:5001/analyze-sentiment`, payload);
  }
}

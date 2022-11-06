import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

   URL:string = environment.baseURL;

  constructor(private http: HttpClient) { }

  uploadFile(formData:FormData){
    return this.http.post(this.URL + '/api/v1/files/uploadFile',formData,{responseType: 'text'}).pipe(
        catchError(error => {
        if(error.status == 500){
          alert(error.error.message);
          return of(error);
        }
        alert(error.error.message);
        throw new Error(error);
      })
    );
  }

  getAllFileLinks(){
    return this.http.get(this.URL + '/api/v1/files/listFiles');
  }
}

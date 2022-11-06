import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fileName = '';
    fileLinks:any[] = [];
    constructor(private fileUploadService: FileUploadService) {}

    ngOnInit(): void {
        this.getAllFiles();
    }

    onFileSelected(event:any) {

        const file:File = event.target.files[0];
        var fileSize = file.size/1024;
        if (file) {
          if(file.type!= 'application/pdf'){
            alert("upload files must be .pdf")
          }else if(fileSize > 1000){
            alert("FileSize must be less than 1MB");
          }else{
            this.fileName = file.name;
            const data = new FormData();
            data.append('files',file);
            this.fileUploadService.uploadFile(data).subscribe((data) => {
              this.fileLinks.push(data);
            })
          }
        }
    }

    getAllFiles(){
      this.fileUploadService.getAllFileLinks().subscribe((data:any) => {
        this.fileLinks = data;
      })
    }
}


import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'webzoologico';
  titlePage = '';

  constructor(@Inject(DOCUMENT) private document: Document){

  }
  ngOnInit(): void {
    
  }
  


}

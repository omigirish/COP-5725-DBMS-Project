import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'traffic-temporal-analysis';
  
  constructor(private router: Router) {}

  selectedNav= "";

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('Current Route:', this.router.url);
        this.selectedNav=this.router.url;
        console.log(this.selectedNav === '/query1')
      });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UsmapComponent } from './Components/usmap/usmap.component';
import { FormsModule } from '@angular/forms';
import { Query1Component } from './Components/query1/query1.component';
import { Query2Component } from './Components/query2/query2.component';
import { Query3Component } from './Components/query3/query3.component';
import { Query4Component } from './Components/query4/query4.component';
import { Query5Component } from './Components/query5/query5.component';
import { DbaccessService } from './dbaccess.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsmapComponent,
    Query1Component,
    Query2Component,
    Query3Component,
    Query4Component,
    Query5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [DbaccessService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

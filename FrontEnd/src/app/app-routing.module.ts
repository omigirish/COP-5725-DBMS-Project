import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { Query1Component } from './Components/query1/query1.component';
import { Query2Component } from './Components/query2/query2.component';
import { Query3Component } from './Components/query3/query3.component';
import { Query4Component } from './Components/query4/query4.component';
import { Query5Component } from './Components/query5/query5.component';

const routes: Routes = [
  {
    path: "dashboard",
    component:  DashboardComponent
  },
  {
    path: "query1",
    component:  Query1Component
  },
  {
    path: "query2",
    component:  Query2Component
  },
  {
    path: "query3",
    component:  Query3Component
  }
  ,{
    path: "query4",
    component:  Query4Component
  },{
    path: "query5",
    component:  Query5Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

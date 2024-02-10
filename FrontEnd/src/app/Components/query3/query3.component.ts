import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DbaccessService } from 'src/app/dbaccess.service';

@Component({
  selector: 'app-query3',
  templateUrl: './query3.component.html',
  styleUrls: ['./query3.component.css']
})
export class Query3Component {

  public chart1: any;
  public charData:any = {"accident_count": [
    1,
    3,
    1,
    104,
    125,
    78,
    79,
    129,
    272,
    313,
    163,
    294,
    226,
    238,
    248,
    199,
    174,
    240,
    51,
    57,
    110,
    178,
    352,
    362,
    340,
    318,
    206,
    185,
    195,
    254,
    243,
    206,
    260,
    271,
    286,
    365,
    222,
    297,
    299,
    434,
    285,
    251,
    232,
    327,
    292,
    165,
    269,
    384,
    325,
    200,
    128
],
"months": [
    "2019-01",
    "2019-02",
    "2019-03",
    "2019-04",
    "2019-05",
    "2019-06",
    "2019-07",
    "2019-08",
    "2019-09",
    "2019-10",
    "2019-11",
    "2019-12",
    "2020-01",
    "2020-02",
    "2020-03",
    "2020-04",
    "2020-05",
    "2020-06",
    "2020-07",
    "2020-08",
    "2020-09",
    "2020-10",
    "2020-11",
    "2020-12",
    "2021-01",
    "2021-02",
    "2021-03",
    "2021-04",
    "2021-05",
    "2021-06",
    "2021-07",
    "2021-08",
    "2021-09",
    "2021-10",
    "2021-11",
    "2021-12",
    "2022-01",
    "2022-02",
    "2022-03",
    "2022-04",
    "2022-05",
    "2022-06",
    "2022-07",
    "2022-08",
    "2022-09",
    "2022-10",
    "2022-11",
    "2022-12",
    "2023-01",
    "2023-02",
    "2023-03"
]};
  stateCodes = [
    "AL",  "AZ", "CA", "CO", "CT",  "GA",   "IL",    "LA", 
    "MD",  "MI", "MN", "MS", "MO",  "NV", "NJ",  "NY", "NC", "ND", "OH", "OK", "OR", "PA",
     "SC",  "TN", "TX", "FL",  "VA", "WA",  "WI"
  ];

  constructor(private db: DbaccessService) { 
    Chart.register(...registerables);
  }

  ngOnInit()
  {
    this.chart1 = new Chart('chart-bars', {
      type: 'line',
      data: {
        labels: this.charData['months'],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels:{color:'#ffffff'},
            display: true,
            
          },
        },
        interaction: {
          intersect: true,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              // drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              // borderDash: [5, 5],
              color: 'rgba(255, 255, 255, .2)',
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                // weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              // drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              // borderDash: [5, 5]
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                // weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    });

    this.db.getAccidentsCount('UT').subscribe((data)=>{
      let color= randomRGBA()
      let x =  {
        label: 'UT',
        tension: 0,
        borderWidth: 4,
        pointRadius: 5,
        pointBackgroundColor: color,
        pointBorderColor: 'transparent',
        borderColor: color,
        backgroundColor: 'transparent',
        fill: true,
        data: data.accident_count,
        hidden:false
      }
      this.chart1.data.datasets.push(x);   
      this.chart1.update();
    })
    let i=0;
    this.stateCodes.forEach(code => {
      i+=1;
      this.db.getAccidentsCount(code).subscribe((data)=>{
        let color= randomRGBA()
        let x =  {
          label: code,
          tension: 0,
          borderWidth: 4,
          pointRadius: 5,
          pointBackgroundColor: color,
          pointBorderColor: 'transparent',
          borderColor: color,
          backgroundColor: 'transparent',
          fill: true,
          data: data.accident_count,
          hidden:true
        }
        this.chart1.data.datasets.push(x);   
        this.chart1.update();
      });
    });
    

   
   
  }



  }

  function randomRGBA() {
    const r = Math.floor(Math.random() * 256); // Red component (0-255)
    const g = Math.floor(Math.random() * 256); // Green component (0-255)
    const b = Math.floor(Math.random() * 256); // Blue component (0-255)
    const a = 0.8; // Alpha component (0-1)
  
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
import { Component, HostListener, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DbaccessService } from 'src/app/dbaccess.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chart1: any;
  public chart2: any;
  public chart3: any;
  detailsBox: HTMLElement | null = document.getElementById('detailsBox');
  selectedState: any = ['ND', 'TX', 'MN', 'FL', 'CA'];
  tableCounts = {
    Total:0,
    Accidents: 0,
    Climate_Conditions: 0,
    Happened_Near: 0,
    Infrastructure: 0,
    Location: 0,
    Recorded_At: 0,
    Time: 0,
    Traffic_Stats: 0,
  };

  years=[2019,2020,2021,2022,2023]
  accidents=[0,0,0,0,0]


  @HostListener('document:mouseover', ['$event'])
  onMouseOver(e: MouseEvent): void {
    if ((e.target as HTMLElement).tagName === 'path') {
      const content =
        (e.target as HTMLElement).getAttribute('data-name') +
        ' : ' +
        Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      if (this.detailsBox) {
        this.detailsBox.innerHTML = content;
        this.detailsBox.style.opacity = '100%';
      }
    } else {
      if (this.detailsBox) {
        this.detailsBox.style.opacity = '0%';
      }
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const x = e.clientX;
    const y = e.clientY;
    if (this.detailsBox) {
      this.detailsBox.style.top = y + 10 + 'px';
      this.detailsBox.style.left = x + 'px';
    }
  }

  constructor(private db: DbaccessService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
    this.db.getTotalTuples().subscribe((data) => {
      this.tableCounts=data; // Handle the API response data here
      console.log(this.tableCounts);
      this.tableCounts.Total=this.tableCounts.Accidents + this.tableCounts.Climate_Conditions + this.tableCounts.Happened_Near + this.tableCounts.Infrastructure +  this.tableCounts.Location + this.tableCounts.Recorded_At + this.tableCounts.Time + this.tableCounts.Traffic_Stats
    });

    this.db.getAccidentsEveryYear().subscribe((data)=> {
      this.chart1 = new Chart('chart-bars', {
        type: 'line',
        data: {
          labels: data["years"],
          datasets: [
            {
            label: 'Accidents',
            borderWidth: 4,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(255, 255, 255, .8)',
            pointBorderColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'transparent',
            fill: true,
              data: data["accidents"],
              // maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
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
                // suggestedMin: 0,
                // suggestedMax: 500,
                // beginAtZero: true,
                padding: 10,
                font: {
                  size: 14,
                  // weight: 300,
                  family: 'Roboto',
                  style: 'normal',
                  lineHeight: 2,
                },
                color: '#fff',
              },
            },
            x: {
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
          },
        },
      });
      console.log(data)})
  }

  createChart() {
    

    this.chart2 = new Chart('chart-line', {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Mobile apps',
            tension: 0,
            borderWidth: 4,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(255, 255, 255, .8)',
            pointBorderColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'transparent',
            fill: true,
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
            // maxBarThickness: 6
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
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

    this.chart3 = new Chart('chart-line-tasks', {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Mobile apps',
            tension: 0,
            borderWidth: 4,
            pointRadius: 5,
            pointBackgroundColor: 'rgba(255, 255, 255, .8)',
            pointBorderColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'transparent',
            fill: true,
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            // maxBarThickness: 6
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
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
              padding: 10,
              color: '#f8f9fa',
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
  }
}

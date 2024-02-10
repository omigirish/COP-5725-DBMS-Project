import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DbaccessService } from 'src/app/dbaccess.service';

@Component({
  selector: 'app-query3',
  templateUrl: './query2.component.html',
  styleUrls: ['./query2.component.css'],
})
export class Query2Component {
  public chart1: any;

  constructor(private db: DbaccessService) {
    Chart.register(...registerables);
  }

  chartData:any;
  public selected_state="FL";
  states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
  ];

  

  ngOnInit() {
    this.db.getTripsData(this.selected_state).subscribe((data) => {
      this.chartData=data;
      this.chart1 = new Chart('chart-bars', {
        type: 'line',
        data: {
          labels: this.chartData['day'],
          datasets: [
            {
              label: 'trips_1_3(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 99, 132, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 99, 132, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_1_3'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_3_5(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(54, 162, 235, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(54, 162, 235, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_3_5'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_5_10(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 206, 86, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 206, 86, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_5_10'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_10_25(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 255, 255, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 255, 255, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_10_25'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_25_50(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(75, 192, 192, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(75, 192, 192, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_25_50'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_50_100(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(153, 102, 255, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(153, 102, 255, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_50_100'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_100_250(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(128, 0, 128, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(128, 0, 128, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_100_250'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_250_500(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(0, 128, 128, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(0, 128, 128, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_250_500'],
              // maxBarThickness: 6
            },
            {
              label: 'trips_gt500(%)',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 0, 255, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 0, 255, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data:this.chartData['trips_gt500'],
              // maxBarThickness: 6
            },
          ],
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
    });

  }

  updateState()
  {
    this.db.getTripsData(this.selected_state).subscribe((data) => {
      this.chartData=data;
      this.chart1.data.labels= this.chartData['day'];
      this.chart1.data.datasets[0].data= this.chartData['trips_1_3'];
      this.chart1.data.datasets[1].data= this.chartData['trips_3_5'];
      this.chart1.data.datasets[2].data= this.chartData['trips_5_10'];
      this.chart1.data.datasets[3].data= this.chartData['trips_10_25'];
      this.chart1.data.datasets[4].data= this.chartData['trips_25_50'];
      this.chart1.data.datasets[5].data= this.chartData['trips_50_100'];
      this.chart1.data.datasets[6].data= this.chartData['trips_100_250'];
      this.chart1.data.datasets[7].data= this.chartData['trips_250_500'];
      this.chart1.data.datasets[8].data= this.chartData['trips_gt500'];
      this.chart1.update();     
    });
  }
}

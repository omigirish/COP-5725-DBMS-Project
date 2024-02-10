import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DbaccessService } from 'src/app/dbaccess.service';

interface ChartData {
  [key: string]: any[];
}




@Component({
  selector: 'app-query1',
  templateUrl: './query1.component.html',
  styleUrls: ['./query1.component.css']
})

export class Query1Component {

  public chart1: any;
  public chart2: any;
  public selected_state="FL";

  states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
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
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' }
  ];

  constructor(private db: DbaccessService) { 
    Chart.register(...registerables);
  }

  charData: ChartData = {
    accident_count: [],
    days: [],
    dhumidity: [],
    dprep: [],
    dpressure: [],
    dvis: [],
    dwind_chill: [],
    dwind_speed: []
};
  climate_condition:string = "dprep"
  startDate:string = "2019-01"
  endDate:string = "2023-01"

  ngOnInit()
  {

    this.db.fetchData(this.startDate, this.endDate, this.selected_state).subscribe((data)=>{
      this.charData=data;
      this.chart1 = new Chart('chart1', {
        type: 'line',
        data: {
          labels: this.charData['days'],
          datasets: [
            {
              label: 'Deviation',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 255, 255, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 255, 255, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data: this.charData['dprep'],
              // maxBarThickness: 6
            }
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

      this.chart2 = new Chart('chart2', {
        type: 'line',
        data: {
          labels: this.charData["days"],
          datasets: [
            {
              label: 'Accidents',
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 255, 255, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 255, 255, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data: this.charData["accident_count"]
              // maxBarThickness: 6
            }
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
    })
    
  }

  updateClimate()
  {
    console.log(this.climate_condition)
    // Modify the data in the chart instance
    this.chart1.data.datasets[0].data = this.charData[this.climate_condition]// Updated data values
    // Update the chart
    this.chart1.update();
  }

  updateDate()
  {
    this.db.fetchData(this.startDate, this.endDate, this.selected_state).subscribe((data)=>
    {
      this.charData=data;
      console.log(data)
      console.log(this.startDate,this.endDate)
      this.chart1.data.datasets[0].data = this.charData[this.climate_condition]// Updated data values
      this.chart1.data.labels= this.charData['days']
      this.chart1.update();

      this.chart2.data.datasets[0].data = this.charData['accident_count']
      this.chart2.data.labels= this.charData['days']
      this.chart2.update();
    })
  }

  updateState()
  {
    this.db.fetchData(this.startDate, this.endDate, this.selected_state).subscribe((data)=>
    {
      this.charData=data;
      console.log(data)
      console.log(this.startDate,this.endDate)
      this.chart1.data.datasets[0].data = this.charData[this.climate_condition]// Updated data values
      this.chart1.data.labels= this.charData['days']
      this.chart1.update();

      this.chart2.data.datasets[0].data = this.charData['accident_count']
      this.chart2.data.labels= this.charData['days']
      this.chart2.update();
    })
  }



  }


import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DbaccessService } from 'src/app/dbaccess.service';

@Component({
  selector: 'app-query5',
  templateUrl: './query5.component.html',
  styleUrls: ['./query5.component.css']
})
export class Query5Component {

  public chart1: any;
  public selected_state1='CA';
  public selected_state2='FL';

  constructor(private db: DbaccessService) { 
    Chart.register(...registerables);
  }
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

  ngOnInit()
  {
    this.db.averageImpactDuration(this.selected_state1).subscribe((data)=>{
      this.chart1 = new Chart('chart-bars', {
        type: 'line',
        data: {
          labels: data['dates'],
          datasets: [
            {
              label: this.selected_state1,
              tension: 0,
              borderWidth: 4,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255, 255, 255, .8)',
              pointBorderColor: 'transparent',
              borderColor: 'rgba(255, 225, 225, .8)',
              backgroundColor: 'transparent',
              fill: true,
              data: data['normalised_avg'],
              // maxBarThickness: 6
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
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
    })

    this.db.averageImpactDuration(this.selected_state2).subscribe((data)=>{
      this.chart1.data.datasets.push({
        label: this.selected_state2,
        tension: 0,
        borderWidth: 4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(0, 0, 0, .8)',
        pointBorderColor: 'transparent',
        borderColor: 'rgba(0, 0, 0, .8)',
        backgroundColor: 'transparent',
        fill: true,
        data: data['normalised_avg'],
        // maxBarThickness: 6
      });
      this.chart1.update();
    })

    
  }

  updateState1()
  {
      this.db.averageImpactDuration(this.selected_state1).subscribe((data)=>{
        this.chart1.data.datasets[0] = {
          label: this.selected_state1,
          tension: 0,
          borderWidth: 4,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(255, 255, 255, .8)',
          pointBorderColor: 'transparent',
          borderColor: 'rgba(255, 225, 225, .8)',
          backgroundColor: 'transparent',
          fill: true,
          data: data['normalised_avg'],
          // maxBarThickness: 6
        }
        this.chart1.data.labels=data['dates']
        this.chart1.update()
      })
  }
  updateState2()
  {
    this.db.averageImpactDuration(this.selected_state2).subscribe((data)=>{
      this.chart1.data.datasets[1] = {
        label: this.selected_state2,
        tension: 0,
        borderWidth: 4,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(0, 0, 0, .8)',
        pointBorderColor: 'transparent',
        borderColor: 'rgba(0, 0, 0, .8)',
        backgroundColor: 'transparent',
        fill: true,
        data: data['normalised_avg'],
        // maxBarThickness: 6
      }
      this.chart1.data.labels=data['dates']
      this.chart1.update()
    })

  }



  }


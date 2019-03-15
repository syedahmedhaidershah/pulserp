import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit, AfterViewInit {
  salesChart: any = [];
  totalSales = 0;

  salesLabels = [];
  salesData = [];
  salesColors = [];
  allowChartTooltips = true;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.generateChart();
  }

  getCurrColorCode(val: number) {
    const yellow = '#ff9900';
    const lemYellow = '#008800';
    const green = '#e6e600';
    const blue = '#0089cf';
    let returnVal = 'green';

    if (val < 100) {
      returnVal = yellow;
    } else if (val >= 100 && val <= 200) {
      returnVal = green;
    } else if (val > 200 && val <= 300) {
      returnVal = lemYellow;
    } else {
      returnVal = blue;
    }
    return returnVal;
  }

  generateChart() {
    Chart.pluginService.register({
      afterDraw: (chart) => {
        try {
          const width = chart.canvas.width,
            height = chart.canvas.height,
            ctx = chart.ctx;

          ctx.restore();

          const saleLen = this.totalSales.toString().length;
          const remainder = saleLen % 9;

          let divider = 0;

          if (this.totalSales === 0) {
            divider = 60;
          } else if (saleLen <= 9) {
            switch (remainder) {
              case 1:
                divider = 60;
                break;
              case 2:
                divider = 80;
                break;
              case 3:
                divider = 100;
                break;
              case 4:
                divider = 120;
                break;
              case 5:
                divider = 140;
                break;
              case 6:
                divider = 160;
                break;
              case 7:
                divider = 180;
                break;
              case 8:
                divider = 200;
                break;
              case 9:
                divider = 220;
                break;
              default:
                divider = 220;
                break;
            }
          } else {
            divider = 240;
          }

          const fontSize = (height / divider).toFixed(2);
          ctx.font = fontSize + 'em sans-serif';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#222222';

          const text = this.totalSales.toString(),
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        } catch (exc) {
          console.log(exc);
          document.body.innerHTML = 'An error occured. Please contact your administrator.';
          window.stop();
        }
      }
    });

    if (this.salesData.length === 0) {
      this.salesData = [100];
      this.salesLabels = ['No revenue generated'];
      this.salesColors = ['#aaa'];
      this.allowChartTooltips = false;
    }

    this.salesChart = new Chart('salesCanvas', {
      type: 'doughnut',
      data: {
        labels: this.salesLabels,
        datasets: [
          {
            pointRadius: 0,
            // pointBackgroundColor: '#ff5722',
            // ['#7cc229', '#0089cf', '#ff671d', '#265783']
            backgroundColor: this.salesColors,
            data: this.salesData,
            fill: false,
            pointBorderWidth: 0,
            borderColor: 'none',
            borderWidth: 0
          }
        ]
      },
      options: {
        tooltips: {
          enabled: this.allowChartTooltips
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: false,
            scaleLabel: {
              display: true,
              labelString: 'Company / Person'
            }
          }],
          yAxes: [{
            display: false,
            scaleLabel: {
              display: true,
              labelString: 'Revenue (PKR)'
            },
            ticks: {
              beginAtZero: true,
              callback: function (value) { if (Number.isInteger(value)) { return value; } },
              // stepSize: 1
            }
          }]
        },
        cutoutPercentage: 70
      }
    });
  }

}

import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-history-graph-component',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './history-graph-component.component.html',
  styleUrls: ['./history-graph-component.component.css']
})
export class HistoryGraphComponent implements OnChanges {
  @Input() dataHistory: any[] = [];

  chartOptions: any = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Sensor Data History"
    },
    axisX: {
      title: "Data Points",
      valueFormatString: "#"
    },
    axisY: {
      title: "Sensor Values"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: []
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("History updated:", this.dataHistory);
    this.updateChartData();
    this.cdr.detectChanges();
  }

  updateChartData() {
    const metrics = ['humidityLevel', 'airQuality', 'temperature'];
    console.log(this.dataHistory)
    console.log("History")

    this.chartOptions.data = metrics.map(metric => ({
      type: "line",
      showInLegend: true,
      name: this.formatLabel(metric),
      dataPoints: this.dataHistory.map((item, index) => ({
        x: index + 1,
        y: item[metric] || 0
      }))
    }));
  }

  //To check chart view
  getRandomValue(metric: string): number {
    switch (metric) {
      case 'humidityLevel':
        return Math.random() * (100 - 20) + 20;
      case 'airQuality':
        return Math.random() * (500 - 50) + 50;
      case 'temperature':
        return Math.random() * (35 - (-10)) + (-10);
      default:
        return Math.random() * 100;
    }
  }


  formatLabel(metric: string): string {
    return metric.replace(/([A-Z])/g, ' $1').trim();
  }
}

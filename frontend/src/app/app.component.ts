import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './layout/header/header-component.component';
import { FooterComponent } from './layout/footer/footer-component.component';
import { DataCardComponent } from './component/data-card-module/data-card-module.component';
import { PlantInfoCardComponent } from './component/plant-info/plant-info-card-component.component';
import { HistoryGraphComponent } from './component/history-graph/history-graph-component.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    DataCardComponent,
    FooterComponent,
    HeaderComponent,
    PlantInfoCardComponent,
    HistoryGraphComponent
  ],
  providers: []
})
export class AppModule { }


import { Component, OnInit } from '@angular/core';
import {WebSocketService} from './service/web-socket-client.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  imports: [
    HeaderComponent,
    DataCardComponent,
    PlantInfoCardComponent,
    HistoryGraphComponent,
    FooterComponent,
    RouterOutlet
  ],
  styles: [`
    .container {
      padding: 0;
    }

    .grid {
      display: flex;
      gap: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  currentData: any = null;
  dataHistory: any[] = [];
  isWebSocketReady: boolean = false;

  constructor(private webSocketService: WebSocketService) {}
  // constructor(private webSocketService: RestPollingService) {}  TODO Uncomment this line to use REST instead WebSocket

  ngOnInit() {
    this.webSocketService.onDataReceived().subscribe(data => {
      this.currentData = data;
      this.dataHistory = [...this.dataHistory, data];
    });

    if (this.dataHistory.length > 20) {
      this.dataHistory.shift();
    }

    this.webSocketService.onReady().subscribe(isReady => {
      this.isWebSocketReady = isReady;
    });
  }

  sendCommand(command: string) {
    if (!this.isWebSocketReady) {
      console.error('WebSocket is not ready to send commands.');
      return;
    }
    this.webSocketService.sendCommand(command);
  }
}

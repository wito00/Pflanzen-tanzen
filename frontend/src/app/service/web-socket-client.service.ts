import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private dataUrl = 'ws://localhost:8080/iot/data';
  private commandUrl = 'ws://localhost:8080/iot/command';

  private dataWebSocket: WebSocket | null = null;
  private commandWebSocket: WebSocket | null = null;
  private dataSubject = new Subject<any>();
  private readySubject = new Subject<boolean>();
  private isReady = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private retryQueue: any[] = [];

  constructor() {
    this.initializeConnections();
  }

  private initializeConnections() {
    this.connectDataWebSocket();
    this.connectCommandWebSocket();
  }

  private connectDataWebSocket() {
    this.dataWebSocket = new WebSocket(this.dataUrl);
    this.dataWebSocket.onopen = () => {
      console.log('Data WebSocket connection opened');
      this.reconnectAttempts = 0;
      this.checkIfReady();
    };
    this.dataWebSocket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      this.dataSubject.next(data);
    };
    this.dataWebSocket.onerror = (error) => console.error('Data WebSocket error:', error);
    this.dataWebSocket.onclose = () => {
      console.log('Data WebSocket connection closed');
      this.isReady = false;
      this.reconnect('data');
    };
  }

  private connectCommandWebSocket() {
    this.commandWebSocket = new WebSocket(this.commandUrl);
    this.commandWebSocket.onopen = () => {
      console.log('Command WebSocket connection opened');
      this.reconnectAttempts = 0;
      this.checkIfReady();
      while (this.retryQueue.length > 0) {
        this.sendCommand(this.retryQueue.shift(), false);
      }
    };
    this.commandWebSocket.onerror = (error) => console.error('Command WebSocket error:', error);
    this.commandWebSocket.onclose = () => {
      console.log('Command WebSocket connection closed');
      this.isReady = false;
      this.reconnect('command');
    };
  }

  private reconnect(type: 'data' | 'command') {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting ${type} WebSocket... Attempt ${this.reconnectAttempts}`);
      setTimeout(() => type === 'data' ? this.connectDataWebSocket() : this.connectCommandWebSocket(), this.reconnectInterval);
    } else {
      console.error(`${type.charAt(0).toUpperCase() + type.slice(1)} WebSocket failed to reconnect.`);
    }
  }

  private checkIfReady() {
    if (this.dataWebSocket?.readyState === WebSocket.OPEN && this.commandWebSocket?.readyState === WebSocket.OPEN) {
      this.isReady = true;
      this.readySubject.next(true);
    }
  }

  sendCommand(command: any, shouldQueue = true) {
    if (!this.isReady || this.commandWebSocket?.readyState !== WebSocket.OPEN) {
      if (shouldQueue) {
        console.warn('WebSocket is not ready. Queuing command...');
        this.retryQueue.push(command);
      } else {
        console.error('WebSocket is not ready to send commands.');
      }
      return;
    }
    try {
      this.commandWebSocket.send(JSON.stringify(command));
      console.log('Command sent:', command);
    } catch (error) {
      console.error('Failed to send command:', error);
      if (shouldQueue) {
        this.retryQueue.push(command);
        this.retryQueue.push(command);
      }
    }
  }

  onDataReceived(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  onReady(): Observable<boolean> {
    return this.readySubject.asObservable();
  }

  closeConnections() {
    this.dataWebSocket?.close();
    this.commandWebSocket?.close();
  }
}

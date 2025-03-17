import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestPollingService {
  private dataUrl = 'http://localhost:8080/iot/data';
  private commandUrl = 'http://localhost:8080/iot/command';

  private dataSubject = new Subject<any>();
  private readySubject = new Subject<boolean>();
  private isReady = false;
  private retryQueue: any[] = [];

  constructor(private http: HttpClient) {
    this.startPolling();
  }

  private startPolling() {
    interval(5000)
      .pipe(
        switchMap(() => this.http.get<any>(this.dataUrl).pipe(
          catchError(error => {
            console.error('REST API error:', error);
            return [];
          })
        ))
      )
      .subscribe(data => {
        this.dataSubject.next(data);
        this.isReady = true;
        this.readySubject.next(true);
      });
  }

  sendCommand(command: any, shouldQueue = true) {
    if (!this.isReady) {
      if (shouldQueue) {
        console.warn('Service is not ready. Queuing command...');
        this.retryQueue.push(command);
      } else {
        console.error('Service is not ready to send commands.');
      }
      return;
    }

    this.http.post(this.commandUrl, command).subscribe({
      next: () => console.log('Command sent:', command),
      error: error => {
        console.error('Failed to send command:', error);
        if (shouldQueue) {
          this.retryQueue.push(command);
        }
      }
    });
  }

  onDataReceived(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  onReady(): Observable<boolean> {
    return this.readySubject.asObservable();
  }
}

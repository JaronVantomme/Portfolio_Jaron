import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private mousePositionSource = new BehaviorSubject<{ x: number, y: number }>({ x: 0, y: 0 });
  private hoveringElementSource = new BehaviorSubject<HTMLElement | null>(null);

  mousePosition$ = this.mousePositionSource.asObservable();
  hoveringElement$ = this.hoveringElementSource.asObservable();

  updateMousePosition(x: number, y: number) {
    this.mousePositionSource.next({ x, y });
  }

  updateHoveringElement(element: HTMLElement | null) {
    this.hoveringElementSource.next(element);
  }
}

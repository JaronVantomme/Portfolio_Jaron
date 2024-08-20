import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CursorService } from './../../services/CursorService';

@Component({
  selector: 'app-cursor-ball',
  standalone: true,
  templateUrl: './cursor-ball.component.html',
  styleUrls: ['./cursor-ball.component.css']
})
export class CursorBallComponent implements OnInit {
  @ViewChild('ball') ball!: ElementRef;
  private ballX: number = 0;
  private ballY: number = 0;
  private isHovering: boolean = false;

  constructor(private cursorService: CursorService) {}

  ngOnInit(): void {
    this.cursorService.mousePosition$.subscribe((position: any) => {
      if (!this.isHovering) {
        this.ballX += (position.x - this.ballX) * 0.1;
        this.ballY += (position.y - this.ballY) * 0.1;
        this.updateBallPosition();
      }
    });

    this.cursorService.hoveringElement$.subscribe((element: any) => {
      if (element) {
        this.isHovering = true;
        this.transformBallToElement(element);
      } else {
        this.isHovering = false;
        this.resetBall();
      }
    });
  }

  updateBallPosition() {
    const ballElement = this.ball.nativeElement;
    ballElement.style.transform = `translate(${this.ballX - ballElement.offsetWidth / 2}px, ${this.ballY - ballElement.offsetHeight / 2}px)`;
  }

  transformBallToElement(element: HTMLElement) {
    const rect = element.getBoundingClientRect();

    this.ballX = rect.left + rect.width / 2;
    this.ballY = rect.top + rect.height / 2;

    const ballElement = this.ball.nativeElement;
    ballElement.style.width = `${rect.width}px`;
    ballElement.style.height = `${rect.height}px`;
    ballElement.style.borderRadius = `15px`;
    ballElement.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
  }

  resetBall() {
    const ballElement = this.ball.nativeElement;
    ballElement.style.width = `35px`;
    ballElement.style.height = `35px`;
    ballElement.style.borderRadius = `50%`;
  }
}

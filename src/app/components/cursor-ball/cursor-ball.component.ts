import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cursor-ball',
  standalone: true,
  imports: [],
  templateUrl: './cursor-ball.component.html',
  styleUrl: './cursor-ball.component.css'
})
export class CursorBallComponent implements OnInit {
  @ViewChild('ball') ball!: ElementRef;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private ballX: number = 0;
  private ballY: number = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => this.updateBallPosition(), 10);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  updateBallPosition() {
    this.ballX += (this.mouseX - this.ballX) * 0.1;
    this.ballY += (this.mouseY - this.ballY) * 0.1;
    const ballElement = this.ball.nativeElement;
    ballElement.style.transform = `translate(${this.ballX - 10}px, ${this.ballY - 10}px)`;
  }
}


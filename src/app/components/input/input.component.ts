import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  user: string = '';

  @Input() placeholder?: string;

  @Output() complete: EventEmitter<string> = new EventEmitter();
  @Output() userEvent: EventEmitter<string> = new EventEmitter();

  onButtonClick(): void {
    this.complete.emit('complete');
  }

  onInputChange(event: any): void {
    this.user = event.target.value;
    this.userEvent.emit(this.user);
  }

  constructor(private router: Router) {}

  goToTrainerPage(): Promise<boolean> {
    return this.router.navigate(['trainer-page']);
  }

  ngOnInit(): void {}
}

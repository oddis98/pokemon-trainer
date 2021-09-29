import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnChanges {
  private _user: string = '';

  @Input() placeholder?: string;
  @Input() user?: User;

  @Output() buttonClick: EventEmitter<string> = new EventEmitter();
  @Output() userEvent: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user.currentValue[0] !== undefined) {
      localStorage.setItem(
        'user',
        JSON.stringify(changes.user.currentValue[0])
      );
      this.router.navigate(['/pokemon-catalogue']);
    }
  }

  onButtonClick(): void {
    this.buttonClick.emit('complete');
  }

  onInputChange(event: any): void {
    this._user = event.target.value;
    this.userEvent.emit(this._user);
  }
}

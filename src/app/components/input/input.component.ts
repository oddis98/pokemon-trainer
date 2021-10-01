import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnChanges {
  @Input() placeholder?: string;
  @Input() user?: User;

  @Output() buttonClick: EventEmitter<string> = new EventEmitter();
  @Output() userEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private readonly sessionService: SessionService,
    private readonly loginService: LoginService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sessionService.getUser()) {
      if (changes.user.currentValue[0] !== undefined) {
        localStorage.setItem(
          'user',
          JSON.stringify(changes.user.currentValue[0])
        );
        this.router.navigate(['/pokemon-catalogue']);
      }
    }
  }

  get isLoading(): boolean {
    return this.loginService.isLoading();
  }

  onButtonClick(loginForm: NgForm): void {
    const { username } = loginForm.value;
    this.loginService.authenticate(username, () =>
      this.router.navigate(['/pokemon-catalogue'])
    );
  }
}

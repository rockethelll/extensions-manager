import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, Header],
  standalone: true,
})
export class App {}

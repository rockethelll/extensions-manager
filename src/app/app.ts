import { Component } from '@angular/core';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header]
})
export class App {}

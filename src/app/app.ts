import { Component } from '@angular/core';
import { Header } from './header/header';
import { Filters } from './filters/filters';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, Filters]
})
export class App {}

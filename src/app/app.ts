import { Component } from '@angular/core';
import { Header } from './header/header';
import { Filters } from './filters/filters';
import { CardItem } from './card-item/card-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, Filters, CardItem],
  standalone: true,
})
export class App {}

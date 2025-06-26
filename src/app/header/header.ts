import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
})
export class Header {
  private isDarkMode = false;
  public darkModeSignal = signal(this.isDarkMode);

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeSignal.set(this.isDarkMode);
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}

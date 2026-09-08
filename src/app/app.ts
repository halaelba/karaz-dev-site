import { Component, LOCALE_ID, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  constructor() {
    const locale = inject(LOCALE_ID);
    const document = inject(DOCUMENT);
    document.documentElement.dir = locale.startsWith('ar') ? 'rtl' : 'ltr';
  }
}

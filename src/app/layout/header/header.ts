import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly locale = inject(LOCALE_ID);
  protected readonly menuOpen = signal(false);

  protected readonly otherLocaleHref = `/${this.locale.startsWith('ar') ? 'en' : 'ar'}/`;
  protected readonly otherLocaleLabel = this.locale.startsWith('ar') ? 'English' : 'العربية';

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

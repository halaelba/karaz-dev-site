import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly locale = inject(LOCALE_ID);
  protected readonly menuOpen = signal(false);

  private readonly document = inject(DOCUMENT);

  protected readonly otherLocaleHref = (() => {
    const path = this.document.location?.pathname ?? '/en/';
    const rest = path.replace(/^\/(en|ar)\/?/, '');
    const target = this.locale.startsWith('ar') ? 'en' : 'ar';
    return `/${target}/${rest}`;
  })();

  protected readonly otherLocaleLabel = this.locale.startsWith('ar') ? 'English' : 'العربية';

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

import { Component, LOCALE_ID, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly locale = inject(LOCALE_ID);
  protected readonly menuOpen = signal(false);

  private readonly router = inject(Router);

  // Angular's router only knows about paths *within* the current locale's
  // base href (e.g. "/about", not "/en/about") -- so the current path has
  // to come from the router itself, not from document.location, and has to
  // be re-read on every navigation since this component lives outside
  // <router-outlet> and is never recreated between pages.
  private readonly currentRouterPath = signal(this.router.url);

  protected readonly otherLocaleHref = computed(() => {
    const target = this.locale.startsWith('ar') ? 'en' : 'ar';
    const path = this.currentRouterPath().replace(/^\//, '');
    return `/${target}/${path}`;
  });

  protected readonly otherLocaleLabel = this.locale.startsWith('ar') ? 'English' : 'العربية';

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.currentRouterPath.set(this.router.url);
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

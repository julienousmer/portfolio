import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Lang, PHOTO, PORTFOLIO_I18N, Project } from './data/portfolio.data';
import { fadeIn, fadeInUp, heroSequence, scaleIn, staggerList } from './animations/portfolio.animations';

const LANG_STORAGE_KEY = 'portfolio-lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInUp, fadeIn, staggerList, heroSequence, scaleIn],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') readonly hostClass = 'block min-h-screen';

  @ViewChildren('reveal') revealElements!: QueryList<ElementRef<HTMLElement>>;

  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly photo = PHOTO;
  readonly year = new Date().getFullYear();

  lang = signal<Lang>(this.initialLang());
  menuOpen = signal(false);
  navScrolled = signal(false);
  activeSection = signal('hero');

  content = computed(() => PORTFOLIO_I18N[this.lang()]);

  private observer?: IntersectionObserver;
  private sectionObserver?: IntersectionObserver;

  constructor() {
    // Keep <html lang>, the tab title and the meta description in sync with the language.
    effect(() => {
      const lang = this.lang();
      const { meta } = this.content();
      this.document.documentElement.lang = lang;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.navScrolled.set(window.scrollY > 12);
  }

  ngAfterViewInit(): void {
    this.onScroll();
    this.setupObservers();
    // Only a language switch re-renders reveal elements: show them at once instead of
    // hiding content the visitor has already seen.
    this.revealElements.changes.subscribe(() =>
      this.revealElements.forEach((el) => el.nativeElement.classList.add('is-visible'))
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.sectionObserver?.disconnect();
  }

  setLang(next: Lang): void {
    if (this.lang() === next) return;
    this.lang.set(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice simply isn't remembered */
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  scrollTo(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  projectStatusLabel(status: Project['status']): string {
    const s = this.content().sections.projects;
    return status === 'school' ? s.school : s.private;
  }

  isFeaturedSection(id: string): boolean {
    return id === 'experience' || id === 'projects';
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch {
      /* storage unavailable */
    }
    return navigator.language?.toLowerCase().startsWith('fr') === false ? 'en' : 'fr';
  }

  private observeReveals(): void {
    this.revealElements?.forEach((el) => {
      if (!el.nativeElement.classList.contains('is-visible')) {
        this.observer?.observe(el.nativeElement);
      }
    });
  }

  private setupObservers(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );
    this.observeReveals();

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          this.activeSection.set(visible.target.id);
        }
      },
      { threshold: [0.15, 0.35], rootMargin: '-15% 0px -50% 0px' }
    );
    sections.forEach((s) => this.sectionObserver?.observe(s));
  }
}

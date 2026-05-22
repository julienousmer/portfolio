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
  signal,
} from '@angular/core';
import { AVATAR_PATH, Lang, PORTFOLIO_I18N, Skill } from './data/portfolio.data';
import {
  fadeIn,
  fadeInUp,
  heroSequence,
  scaleIn,
  staggerList,
} from './animations/portfolio.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeInUp, fadeIn, staggerList, heroSequence, scaleIn],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') readonly hostClass = 'block min-h-screen';

  @HostBinding('attr.lang') get htmlLang() {
    return this.lang();
  }

  @ViewChildren('reveal') revealElements!: QueryList<ElementRef<HTMLElement>>;

  readonly avatarPath = AVATAR_PATH;
  readonly year = new Date().getFullYear();

  lang = signal<Lang>('fr');
  menuOpen = signal(false);
  navScrolled = signal(false);
  activeSection = signal('hero');

  content = computed(() => PORTFOLIO_I18N[this.lang()]);

  readonly heroStats = [
    { value: '3+', key: { fr: 'ans d’expérience', en: 'years experience' } },
    { value: '130+', key: { fr: 'utilisateurs intranet', en: 'intranet users' } },
    { value: '3000+', key: { fr: 'adhérents outillés', en: 'members served' } },
  ];

  private observer?: IntersectionObserver;
  private sectionObserver?: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll(): void {
    this.navScrolled.set(window.scrollY > 12);
  }

  ngAfterViewInit(): void {
    this.onScroll();
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.sectionObserver?.disconnect();
  }

  setLang(next: Lang): void {
    if (this.lang() !== next) {
      this.lang.set(next);
      setTimeout(() => this.setupObservers(), 0);
    }
  }

  statLabel(stat: (typeof this.heroStats)[0]): string {
    return stat.key[this.lang()];
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  scrollTo(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  skillsByCategory(category: Skill['category']): Skill[] {
    return this.content().skills.filter((s) => s.category === category);
  }

  projectStatusLabel(status: 'private' | 'notDeployed'): string {
    const s = this.content().sections.projects;
    return status === 'notDeployed' ? s.notDeployed : s.private;
  }

  isFeaturedSection(id: string): boolean {
    return id === 'experience' || id === 'projects';
  }

  private setupObservers(): void {
    this.observer?.disconnect();
    this.sectionObserver?.disconnect();

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

    this.revealElements?.forEach((el) => {
      el.nativeElement.classList.remove('is-visible');
      this.observer?.observe(el.nativeElement);
    });

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

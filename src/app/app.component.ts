import { AfterViewInit, Component, DestroyRef, Injector, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Lang, PHOTO, PORTFOLIO_I18N } from './data/portfolio.data';

const LANG_STORAGE_KEY = 'portfolio-lang';
const THEME_STORAGE_KEY = 'portfolio-theme';
type Theme = 'light' | 'dark';

/** The design-system scripts in public/assets, loaded once the first render is in the DOM. */
const KIT_SCRIPTS = [
  'assets/system.js',
  'assets/motion/motion.js',
  'assets/layout/layout.js',
  'assets/diagrams/mount.js',
];

/** A dynamic import Angular's bundler leaves alone: the kit lives in public/, outside the build. */
const importKit = (path: string): Promise<any> =>
  (new Function('p', 'return import(p)') as (p: string) => Promise<any>)(
    new URL(path, document.baseURI).href
  );

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  readonly photo = PHOTO;
  readonly year = new Date().getFullYear();

  lang = signal<Lang>(this.initialLang());
  theme = signal<Theme>(this.initialTheme());
  /** Which fact the hero's float card shows. */
  floatIndex = signal(0);

  content = computed(() => PORTFOLIO_I18N[this.lang()]);
  /** One-item list keyed by language: the statement, which the word-highlight moment rewrites, is rebuilt per language. */
  langKey = computed(() => [this.lang()]);

  diagramSpec = computed(() => {
    const d = this.content().intranet.diagram;
    return JSON.stringify({
      layout: 'hub',
      alt: d.alt,
      pulse: 'none',
      center: { label: d.center, icon: 'symfony' },
      spokes: d.spokes,
    });
  });

  /** The accessible name of a project's tool panel. */
  toolLabel(tools: { name: string }[]): string {
    return `${this.content().projects.toolsLabel} ${tools.map((t) => t.name).join(', ')}`;
  }

  private kitReady = false;

  constructor() {
    effect(() => {
      const lang = this.lang();
      const { meta } = this.content();
      this.document.documentElement.lang = lang;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      // Redraw once Angular has written the new language into the DOM (the next render), never before.
      if (this.kitReady) {
        const spec = this.diagramSpec();
        afterNextRender(() => this.remountKit(spec), { injector: this.injector });
      }
    });

    effect(() => {
      const theme = this.theme();
      const html = this.document.documentElement;
      html.dataset['theme'] = theme;
      html.dataset['tone'] = theme;
      // icon.css: light tiles on a dark ground, so every brand colour and black mark reads
      html.classList.toggle('ic-dark', theme === 'dark');
      this.meta.updateTag({ name: 'theme-color', content: theme === 'dark' ? '#1c1b17' : '#dfdedb' });
    });
  }

  ngAfterViewInit(): void {
    // The kit wires the nav sheet, hovers, the hero entrance, the diagram and the moments by itself.
    for (const src of KIT_SCRIPTS) {
      const s = this.document.createElement('script');
      s.type = 'module';
      s.src = src;
      this.document.body.appendChild(s);
    }
    this.kitReady = true;
    this.observeReveals();
    if (!this.reducedMotion()) {
      this.cycleFloats();
      this.followPointer();
      this.livenDiagram();
    }
  }

  private reducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  /** The hero card shows one fact, then the next, every 4 s; it waits while the tab is hidden. */
  private cycleFloats(): void {
    const id = window.setInterval(() => {
      if (this.document.hidden) return;
      const n = this.content().hero.floats.length;
      this.floatIndex.update((i) => (i + 1) % n);
    }, 4000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  /** A soft light follows the pointer over every [data-spot] card (mouse and pen only). */
  private followPointer(): void {
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-spot]');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    this.document.addEventListener('pointermove', move, { passive: true });
    this.destroyRef.onDestroy(() => this.document.removeEventListener('pointermove', move));
  }

  /**
   * The kit holds a diagram still on a service page; here pulses run from each module into the
   * intranet's core, one after the other, and the core answers. Re-applied whenever the kit redraws.
   */
  private livenDiagram(): void {
    const host = this.document.querySelector<HTMLElement>('.dg');
    if (!host) return;
    const NS = 'http://www.w3.org/2000/svg';
    const apply = () => {
      const svg = host.querySelector<SVGSVGElement>('svg.dg-svg');
      if (!svg || svg.querySelector('.jd-pulse')) return;
      const lines = Array.from(svg.querySelectorAll<SVGPathElement>('path.dg-line'));
      const cycle = 1.1 * lines.length;
      let centre: [number, number] | null = null;
      lines.forEach((line, i) => {
        const m = /M\s*([\d.]+)[ ,]([\d.]+)\s*L\s*([\d.]+)[ ,]([\d.]+)/.exec(line.getAttribute('d') || '');
        if (!m) return;
        const [x1, y1, x2, y2] = m.slice(1).map(Number);
        centre ??= [x1, y1];
        const dot = this.document.createElementNS(NS, 'circle');
        dot.setAttribute('class', 'jd-pulse');
        dot.setAttribute('r', '4.5');
        dot.setAttribute('opacity', '0');
        const begin = `${(i * 1.1).toFixed(2)}s`;
        const motion = this.document.createElementNS(NS, 'animateMotion');
        motion.setAttribute('path', `M${x2} ${y2}L${x1} ${y1}`);
        motion.setAttribute('dur', `${cycle}s`);
        motion.setAttribute('keyPoints', '0;1;1');
        motion.setAttribute('keyTimes', `0;${(1.1 / cycle).toFixed(3)};1`);
        motion.setAttribute('calcMode', 'linear');
        motion.setAttribute('begin', begin);
        motion.setAttribute('repeatCount', 'indefinite');
        const fade = this.document.createElementNS(NS, 'animate');
        fade.setAttribute('attributeName', 'opacity');
        fade.setAttribute('values', '0;1;1;0;0');
        const k = 1.1 / cycle;
        fade.setAttribute('keyTimes', `0;${(k * 0.15).toFixed(3)};${(k * 0.8).toFixed(3)};${k.toFixed(3)};1`);
        fade.setAttribute('dur', `${cycle}s`);
        fade.setAttribute('begin', begin);
        fade.setAttribute('repeatCount', 'indefinite');
        dot.append(motion, fade);
        svg.appendChild(dot);
      });
      if (centre) {
        const [cx, cy] = centre as [number, number];
        const ring = this.document.createElementNS(NS, 'circle');
        ring.setAttribute('class', 'jd-pulse jd-ring');
        ring.setAttribute('cx', String(cx));
        ring.setAttribute('cy', String(cy));
        ring.innerHTML = `<animate attributeName="r" values="4;34" dur="1.1s" begin="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0" dur="1.1s" begin="1.1s" repeatCount="indefinite"/>`;
        ring.setAttribute('r', '4');
        ring.setAttribute('opacity', '0');
        svg.insertBefore(ring, svg.firstChild);
      }
    };
    const mo = new MutationObserver(apply);
    mo.observe(host, { childList: true, subtree: true });
    apply();
    this.destroyRef.onDestroy(() => mo.disconnect());
  }

  /**
   * Projects and career play their entrance once, when a third of the block is on screen.
   * The hidden state exists only under html.js-reveal, so without script, or under reduced motion
   * (CSS), everything simply shows.
   */
  private observeReveals(): void {
    const els = this.document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window) || !els.length) return;
    this.document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3 }
    );
    els.forEach((el) => io.observe(el));
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

  toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }

  /** After a language switch Angular rebuilt the keyed blocks: draw the diagram and mount the moment again. */
  private async remountKit(spec: string): Promise<void> {
    try {
      const [dg, mo] = await Promise.all([
        importKit('assets/diagrams/diagram.js'),
        importKit('assets/moments/moments.js'),
      ]);
      this.document
        .querySelectorAll<HTMLElement>('[data-diagram]')
        .forEach((el) => dg.mount(el, JSON.parse(spec)));
      this.document.querySelectorAll<HTMLElement>('[data-moment]').forEach((el) => mo.mount(el));
    } catch (e) {
      console.warn('portfolio: kit remount failed', e);
    }
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

  private initialTheme(): Theme {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* storage unavailable */
    }
    return 'light';
  }
}

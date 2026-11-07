import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('portfolio-lang');
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the portfolio name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Julien Devienne-Ousmer');
  });

  it('should switch to English', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.setLang('en');
    fixture.detectChanges();
    expect(app.content().hero.ctaContact).toBe('Get in touch');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('Full-Stack Web Developer');
    expect(localStorage.getItem('portfolio-lang')).toBe('en');
  });

  it('should list the same tools in both languages', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const names = () => app.content().stack.layers.flatMap((l) => l.tools.map((t) => t.name)).join();
    const fr = names();
    app.setLang('en');
    expect(names()).toBe(fr);
  });

  it('should toggle and remember the dark theme', () => {
    localStorage.removeItem('portfolio-theme');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.toggleTheme();
    fixture.detectChanges();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    app.toggleTheme();
    localStorage.removeItem('portfolio-theme');
  });
});

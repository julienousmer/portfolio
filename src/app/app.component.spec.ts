import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('portfolio-lang');
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
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

  it('should list the same skills in both languages', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const count = () => app.content().skills.reduce((n, g) => n + g.items.length, 0);
    const fr = count();
    app.setLang('en');
    expect(count()).toBe(fr);
  });
});

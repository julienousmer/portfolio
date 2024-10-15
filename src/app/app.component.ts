import {Component, HostBinding, signal} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  @HostBinding('class.dark') get mode() {return this.darkMode(); }

  title = 'Portfolio';
  darkMode = signal<boolean>(false);
}

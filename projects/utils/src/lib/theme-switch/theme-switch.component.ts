import { Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";



@Component({
  selector: 'theme-switch',
  templateUrl: 'theme-switch.component.html',
  styleUrls: ['theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnChanges {

  @Input()
  lightTheme: boolean = true;

  @Output()

  private _darkTheme: HTMLLinkElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lightTheme']) {
      const value = changes['lightTheme'].currentValue;
      value ? this._removeDarkTheme() : this._addDarkTheme();
    }
  }

  changeTheme(): void {
    this.lightTheme = !this.lightTheme;
    if (this.lightTheme) {
      this._removeDarkTheme();
    }
    else {
      this._addDarkTheme();
    }
  }

  private _addDarkTheme(): void {
    this._darkTheme = document.createElement('link');
    this._darkTheme.href = 'themes/purple-green.css';
    this._darkTheme.rel = 'stylesheet';
    document.head.appendChild(this._darkTheme);
  }

  private _removeDarkTheme(): void {
    this._darkTheme?.remove();
  }

}

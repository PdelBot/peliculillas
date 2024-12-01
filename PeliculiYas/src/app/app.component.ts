import { Component, OnInit } from '@angular/core';
import { LanguageSelectorService } from './services/language-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Peliculillas';

  constructor(private languageService: LanguageSelectorService) { }
  ngOnInit(): void {
    const language = localStorage.getItem('selectedLanguage') || 'en-US';
    this.languageService.setSelectedLanguage(language);
  }
}

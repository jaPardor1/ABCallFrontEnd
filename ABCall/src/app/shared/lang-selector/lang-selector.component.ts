import { Component } from '@angular/core';
import { TranslationService } from '../../service/i18n/translation.service';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.css'
})
export class LangSelectorComponent {
  

  langs = [{id:'es',value:"ES"},{id:'en',value:"EN"}];
  lang:string;
  constructor(private translationService: TranslationService){
        this.lang='es';
  }

  changeLanguage() {
    debugger; 
    this.translationService.changeLanguage(this.lang);
  }

}

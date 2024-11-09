import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../service/i18n/translation.service';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.css'
})
export class LangSelectorComponent implements OnInit {


  langs = [{id:'es',value:"ES"},{id:'en',value:"EN"}];
  lang:string;
  constructor(private translationService: TranslationService){
        this.lang='es';
  }
  ngOnInit(): void {
    this.lang = this.translationService.getCurrentLang()
  }



  changeLanguage() {
    debugger;
    this.translationService.changeLanguage(this.lang);
  }

}

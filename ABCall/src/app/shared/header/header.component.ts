import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderOptionDTO } from './headerOption';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../service/i18n/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public moduleName: string = '';
  public options: HeaderOptionDTO[] = [];
  public currentOption = 0;
  public userRole: string = '';

  private languageChangeSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
    this.userRole = this.authService.getUserRole() ?? '';
  }

  ngOnInit() {
    // Inicializar las opciones y suscribirse al cambio de idioma
    this.configureOptions();

    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => {

      this.configureOptions(); // Actualiza las opciones cuando el idioma cambie
      let nombre = this.options.find(x => x.id==this.currentOption);
      if(nombre!== undefined){
        this.moduleName = nombre.name;
      }
    });
  }

  ngOnDestroy() {
    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe(); // Limpiar la suscripción cuando el componente se destruya
    }
  }

  configureOptions() {
    this.options = [
      {
        id: 1,
        name: this.translate.instant('headerOptions.HEADER_OPTION_RADICAR_PQR'),

        link: "createIncidence",
        allowedRoles: ['Regular', 'Admin', 'Superadmin']
      },
      {
        id: 2,
        name: this.translate.instant('headerOptions.HEADER_OPTION_CONSULTAR_PQR'),

        link: "listIncidences",
        allowedRoles: ['Regular', 'Admin', 'Superadmin']
      },
      {
        id: 3,
        name: this.translate.instant('headerOptions.HEADER_OPTION_USUARIOS_REGISTRADOS'),

        link: "listUsers",
        allowedRoles: ['Admin', 'Superadmin']
      },
      {
        id: 4,
        name: this.translate.instant('headerOptions.HEADER_OPTION_BASE_DE_CONOCIMIENTOS'),

        link: "articlesList",
        allowedRoles: ['Regular', 'Admin', 'Superadmin', 'Agent']
      },
      {
        id: 5,
        name: this.translate.instant('headerOptions.HEADER_OPTION_FLOWS'),

        link: "flows",
        allowedRoles: ['Admin', 'Superadmin', 'Agent']
      },
      {
        id: 6,
        name: this.translate.instant('headerOptions.HEADER_OPTION_INCIDENT_MANAGEMENT'),

        link: "incidentManagement",
        allowedRoles: ['Admin', 'Superadmin', 'Agent']
      },
      {
        id: 7,
        name: this.translate.instant('headerOptions.HEADER_OPTION_DASHBOARD'),

        link: "dashboard",
        allowedRoles: ['Admin', 'Superadmin']
      },
      {
        id: 8,
        name: this.translate.instant('headerOptions.HEADER_OPTION_CLIENTS'),
        link: "clients",
        allowedRoles: ['Admin', 'Superadmin']
      },

    ];


  }

  setModuleName(name: string, id: number) {
    this.moduleName = name;
    this.setActiveOption(id);
  }

  setActiveOption(cOption: number) {
    this.currentOption = cOption;
  }
  isActiveClass(id:number){
    let chk = (id ==this.currentOption)
    return chk;
  }

  async onLogOut() {
    await this.authService.onSignOut();
    this.router.navigateByUrl('login');
  }

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
  }
}

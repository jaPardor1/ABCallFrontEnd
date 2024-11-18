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
  public currentOption = 3;
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
        isActive: false,
        link: "createIncidence",
        allowedRoles: ['Regular', 'Admin', 'Superadmin']
      },
      {
        id: 2,
        name: this.translate.instant('headerOptions.HEADER_OPTION_CONSULTAR_PQR'),
        isActive: false,
        link: "listIncidences",
        allowedRoles: ['Regular', 'Admin', 'Superadmin']
      },
      {
        id: 3,
        name: this.translate.instant('headerOptions.HEADER_OPTION_USUARIOS_REGISTRADOS'),
        isActive: false,
        link: "listUsers",
        allowedRoles: ['Admin', 'Superadmin']
      },
      {
        id: 4,
        name: this.translate.instant('headerOptions.HEADER_OPTION_BASE_DE_CONOCIMIENTOS'),
        isActive: false,
        link: "articlesList",
        allowedRoles: ['Regular', 'Admin', 'Superadmin', 'Agent']
      },
      {
        id: 5,
        name: this.translate.instant('headerOptions.HEADER_OPTION_FLOWS'),
        isActive: false,
        link: "flows",
        allowedRoles: ['Admin', 'Superadmin', 'Agent']
      },
      {
        id: 6,
        name: this.translate.instant('headerOptions.HEADER_OPTION_INCIDENT_MANAGEMENT'),
        isActive: false,
        link: "incidentManagement",
        allowedRoles: ['Admin', 'Superadmin', 'Agent']
      }

    ];

    this.setActiveOption(this.currentOption);
  }

  setModuleName(name: string, id: number) {
    this.moduleName = name;
    this.setActiveOption(id);
  }

  setActiveOption(cOption: number) {
    let searched_obj: HeaderOptionDTO | undefined = this.options.find(i => i.id == this.currentOption);
    if (searched_obj !== undefined) searched_obj.isActive = false;
    searched_obj = this.options.find(i => i.id == cOption);
    if (searched_obj !== undefined) searched_obj.isActive = true;
    this.currentOption = cOption;
  }

  async onLogOut() {
    await this.authService.onSignOut();
    this.router.navigateByUrl('login');
  }

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
  }
}

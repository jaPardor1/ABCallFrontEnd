import { AfterViewInit, Component, ComponentRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { RadicarPQRClienteComponent } from '../../pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { ListadoPqrComponent } from '../../pqr/listado-pqr/listado-pqr.component';
import { ArticleListComponent } from '../../knwoledgebase/article-list/article-list.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit, AfterViewInit {
  activeTabIndex: number = 0; // Índice de la pestaña activa
  private languageChangeSubscription: Subscription | undefined;

  // Arreglo de pestañas dinámicas
  tabs: any[] =[];

  activeComponentRef?: ComponentRef<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;
  @Input() user_sub: string = "";
  @Output() public riskEvaluation: EventEmitter<any> = new EventEmitter<any>();
  constructor(private translate: TranslateService) {

  }
  ngOnInit() {
    // Inicializar las opciones y suscribirse al cambio de idioma
    this.configureTabs();
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.configureTabs(); // Actualiza las opciones cuando el idioma cambie
    });
  }

  ngOnDestroy() {
    // Limpiar la referencia del componente activo al destruir el TabsComponent
    if (this.activeComponentRef) {
      this.activeComponentRef.destroy();
    }

    if (this.languageChangeSubscription) {
      this.languageChangeSubscription.unsubscribe(); // Limpiar la suscripción cuando el componente se destruya
    }
  }

  configureTabs(){
    this.tabs= [
      { title:this.translate.instant('headerOptions.HEADER_OPTION_RADICAR_PQR'), component: RadicarPQRClienteComponent, state: {}, },
      { title:this.translate.instant('tabModule.historialIncidentes'), component: ListadoPqrComponent, state: {}, },
      { title:this.translate.instant('headerOptions.HEADER_OPTION_BASE_DE_CONOCIMIENTOS'), component: ArticleListComponent, state: {}, },
    ];
  }

  ngAfterViewInit() {
    this.activateTab(this.activeTabIndex); // Cargar la primera pestaña
  }
  activateTab(index: number) {
    // if (index === this.activeTabIndex) {
    //   return; // Evitar recrear la misma pestaña
    // }

    // Guardar estado del componente actual antes de cambiar
    this.saveCurrentState();

    this.activeTabIndex = index;

    // Limpiar la vista anterior antes de cargar una nueva

    this.viewContainer.clear();

    let data = {
      gestion: true,
      user_sub: this.user_sub
    }

    // Cargar el nuevo componente
    const tab = this.tabs[index];
    const componentRef:ComponentRef<any> = this.viewContainer.createComponent(tab.component, {
      injector: this.createInjector(data, tab.state),
    });

    if (index == 1) {
      componentRef.instance.incidentIdrequested.subscribe((incidentInfo:any) => {
            console.log("risk evaluation required for pqr"+incidentInfo.idPqr)
            this.riskEvaluation.emit(incidentInfo);
    }
      );
    }

    // Guardar referencia del componente activo (opcional, para manejar eventos o limpiar)
    this.activeComponentRef = componentRef;
  }

  createInjector(data: any, state: any): Injector {
    return Injector.create({
      providers: [
        { provide: 'tabData', useValue: data, },
        { provide: 'tabState', useValue: state },
      ],
    });
  }


  saveCurrentState() {
    if (this.activeComponentRef) {
      // Llamar a un método en el componente dinámico para guardar el estado
      const currentTab = this.tabs[this.activeTabIndex];
      currentTab.state = this.activeComponentRef.instance.getState();
    }
  }



}

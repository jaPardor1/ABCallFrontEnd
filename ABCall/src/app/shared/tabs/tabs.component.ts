import { AfterViewInit, Component, ComponentRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RadicarPQRClienteComponent } from '../../pqr/radicar-pqrcliente/radicar-pqrcliente.component';
import { ListadoPqrComponent } from '../../pqr/listado-pqr/listado-pqr.component';
import { ArticleListComponent } from '../../knwoledgebase/article-list/article-list.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit ,AfterViewInit {
  activeTabIndex: number = 0; // Índice de la pestaña activa

  // Arreglo de pestañas dinámicas
  tabs: any[] = [
    { title:  'RADICAR PQR', component: RadicarPQRClienteComponent,state: {}, },
    { title: 'HISTORIAL INCIDENTES', component: ListadoPqrComponent,state: {}, },
    { title: 'BASE DE CONOCIMIENTO', component: ArticleListComponent,state: {}, },
  ];



  activeComponentRef?: ComponentRef<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;
  @Input() user_sub:string="";
  constructor(){

  }
  ngOnInit() {

  }

  ngAfterViewInit(){
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

    let data ={
        gestion:true,
        user_sub:this.user_sub
    }

    // Cargar el nuevo componente
    const tab = this.tabs[index];
    const componentRef = this.viewContainer.createComponent(tab.component, {
      injector: this.createInjector(data, tab.state),
    });

    // Guardar referencia del componente activo (opcional, para manejar eventos o limpiar)
    this.activeComponentRef = componentRef;
  }

  createInjector(data: any,state:any): Injector {
    return Injector.create({
      providers: [
        {provide: 'tabData',useValue: data,},
        {provide: 'tabState', useValue: state },
      ],
    });
  }

  ngOnDestroy() {
    // Limpiar la referencia del componente activo al destruir el TabsComponent
    if (this.activeComponentRef) {
      this.activeComponentRef.destroy();
    }
  }

  saveCurrentState() {
    if (this.activeComponentRef) {
      // Llamar a un método en el componente dinámico para guardar el estado
      const currentTab = this.tabs[this.activeTabIndex];
      currentTab.state = this.activeComponentRef.instance.getState();
    }
  }



}

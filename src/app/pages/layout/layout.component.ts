import { Component, ViewEncapsulation,  ChangeDetectorRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from '../../../environments/environment';
import { MatSidenav } from '@angular/material/sidenav';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnDestroy, OnInit {
	
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	
	@ViewChild('panel') panel: MatExpansionPanel | any;
	@ViewChild('snav') snav: MatSidenav | any;

	public selectedItem: any;
	public environment: any;
	public isMobile: boolean = false;
	public flaglogoEmp: boolean = false;


	menu: NavItem[] = [];

	constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this.isMobile = this.mobileQuery.matches;
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit(): void {
    this.buildMenu();
		this.environment = environment;
	}

	buildMenu(){
    this.menu = [
      {
        displayName: 'Home',
        iconName: 'home',
        route: 'dashboard',
      },
      {
        displayName: 'Categoria',
        iconName: 'category',
        route: 'category',
      },
      {
        displayName: 'Subcategoria',
        iconName: 'featured_play_listy',
        route: 'subcategory',
      },
	  {
        displayName: 'Registres',
        iconName: 'attach_money',
        route: 'register',
      },
    ];
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	selectItemMenu(item: any) { 
		this.selectedItem = item;
		if (this.mobileQuery.matches){
			this.snav.toggle();
		}
	}
}

export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}
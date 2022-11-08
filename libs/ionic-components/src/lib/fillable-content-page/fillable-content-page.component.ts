import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { Observable, of } from "rxjs";
import { ActivatedRouteSnapshot } from "@angular/router";
import { NavigationService } from "@conferentia/angular-services";

@Component({
  selector: 'conferentia-fillable-content-page[content]',
  templateUrl: './fillable-content-page.component.html',
  styleUrls: ['./fillable-content-page.component.scss'],
})
export class FillableContentPageComponent implements OnInit {

  @Input() content: TemplateRef<any> | null = null;

  public currentRoute$: Observable<ActivatedRouteSnapshot | null> = of(null);

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.currentRoute$ = this.navigationService.currentRoute$.asObservable();
  }
}

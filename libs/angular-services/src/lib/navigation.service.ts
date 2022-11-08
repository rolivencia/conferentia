import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public currentRoute$: BehaviorSubject<ActivatedRouteSnapshot | null> =
    new BehaviorSubject<ActivatedRouteSnapshot | null>(null);
  constructor() {}
}

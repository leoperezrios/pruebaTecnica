import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsServices{
    private sidebarOpened = new BehaviorSubject<boolean>(false)
    sidebarOpened$ = this.sidebarOpened.asObservable();

    openSidebar(value: boolean): void {
        this.sidebarOpened.next(value);
    }
}
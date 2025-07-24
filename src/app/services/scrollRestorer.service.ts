import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollRestorerService {
  private lastY = 0;

  save() {
    this.lastY = window.pageYOffset || document.documentElement.scrollTop;
  }

  restore() {
    window.scrollTo(0, this.lastY);
  }
}

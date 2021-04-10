import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor(private _el: ElementRef, private _renderer: Renderer2) { }

    @HostBinding('class.show') show = false;
    @HostListener('click') toogleDropdown() {
        this.show = !this.show;
        const dropdown = this._el.nativeElement.querySelector('.dropdown-menu');

        if (this.show) {
            this._renderer.addClass(dropdown, 'show');
        } else {
            this._renderer.removeClass(dropdown, 'show');
        }
    }
}

import { ElementRef } from '@angular/core';
export declare class RemoveCaracteresDirective {
    private el;
    constructor(el: ElementRef);
    onKeyPress(event: any): void;
    blockPaste(event: KeyboardEvent): void;
    validateFields(event: any): void;
}

import { ElementRef, AfterViewChecked, AfterContentInit, DoCheck, EventEmitter, QueryList, TemplateRef, Renderer2, ChangeDetectorRef, IterableDiffers } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { ControlValueAccessor } from '@angular/forms';
export declare const AUTOCOMPLETE_VALUE_ACCESSOR: any;
export declare class AutoComplete implements AfterViewChecked, AfterContentInit, DoCheck, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    objectUtils: ObjectUtils;
    cd: ChangeDetectorRef;
    differs: IterableDiffers;
    minLength: number;
    delay: number;
    style: any;
    styleClass: string;
    inputStyle: any;
    inputId: string;
    inputStyleClass: string;
    placeholder: string;
    readonly: boolean;
    disabled: boolean;
    maxlength: number;
    required: boolean;
    size: number;
    multiplicador: number;
    appendTo: any;
    autoHighlight: boolean;
    forceSelection: boolean;
    type: string;
    autoZIndex: boolean;
    baseZIndex: number;
    ariaLabel: string;
    ariaLabelledBy: string;
    completeMethod: EventEmitter<any>;
    onSelect: EventEmitter<any>;
    onUnselect: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onDropdownClick: EventEmitter<any>;
    onClear: EventEmitter<any>;
    onKeyUp: EventEmitter<any>;
    customValue: EventEmitter<any>;
    onAdd: EventEmitter<any>;
    onAddVazio: EventEmitter<any>;
    onDuplicado: EventEmitter<any>;
    onBackspace: EventEmitter<any>;
    valorInternoModificado: EventEmitter<any>;
    field: string;
    colunaChip: string;
    colunaOpcao: string;
    scrollHeight: string;
    dropdown: boolean;
    pseudoExcluir: boolean;
    excluirEmDuasEtapas: boolean;
    dropdownMode: string;
    multiple: boolean;
    podeAdicionar: boolean;
    podeDuplicados: boolean;
    tabindex: number;
    dataKey: string;
    emptyMessage: string;
    immutable: boolean;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    inputEL: ElementRef;
    multiInputEL: ElementRef;
    multiContainerEL: ElementRef;
    dropdownButton: ElementRef;
    containerPanel: ElementRef;
    templates: QueryList<any>;
    overlay: HTMLDivElement;
    itemTemplate: TemplateRef<any>;
    selectedItemTemplate: TemplateRef<any>;
    value: any;
    _suggestions: any[];
    onModelChange: Function;
    onModelTouched: Function;
    timeout: any;
    overlayVisible: boolean;
    documentClickListener: any;
    suggestionsUpdated: boolean;
    highlightOption: any;
    highlightOptionChanged: boolean;
    focus: boolean;
    filled: boolean;
    inputClick: boolean;
    inputKeyDown: boolean;
    noResults: boolean;
    differ: any;
    inputFieldValue: string;
    loading: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, objectUtils: ObjectUtils, cd: ChangeDetectorRef, differs: IterableDiffers);
    suggestions: any[];
    ngDoCheck(): void;
    ngAfterViewChecked(): void;
    includeAddToOptionsToDisplay(): void;
    getFilterValue(): string;
    valueTypedIsPresent(): boolean;
    getValueFiltradoAcao(): any;
    onAddNovo(event: any): void;
    handleSuggestionsChange(): void;
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onInput(event: Event): void;
    onInputClick(event: MouseEvent): void;
    search(event: any, query: string): void;
    selectItem(option: any, focus?: boolean): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    onOverlayAnimationDone(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    alignOverlay(): void;
    hide(): void;
    handleDropdownClick(event: any): void;
    focusInput(): void;
    focusSearchInput(): void;
    removeByIndex(index: number): void;
    removeItem(item: any, index?: number): void;
    onKeydown(event: any): void;
    onKeyup(event: any): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onInputChange(event: any): void;
    onInputPaste(event: ClipboardEvent): void;
    isSelected(val: any): boolean;
    findOptionIndex(option: any): number;
    updateFilledState(): void;
    updateInputField(): void;
    bindDocumentClickListener(): void;
    isDropdownClick(event: any): boolean;
    unbindDocumentClickListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class AutoCompleteModule {
}

import { ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Renderer2, EventEmitter, QueryList, TemplateRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { SelectItem } from '../common/selectitem';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { ControlValueAccessor } from '@angular/forms';
export declare const DROPDOWN_VALUE_ACCESSOR: any;
export declare class Dropdown implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    private cd;
    objectUtils: ObjectUtils;
    zone: NgZone;
    scrollHeight: string;
    filter: boolean;
    name: string;
    style: any;
    panelStyle: any;
    styleClass: string;
    panelStyleClass: string;
    disabled: boolean;
    readonly: boolean;
    autoWidth: boolean;
    required: boolean;
    editable: boolean;
    podeAdicionar: boolean;
    appendTo: any;
    tabindex: number;
    placeholder: string;
    filterPlaceholder: string;
    inputId: string;
    selectId: string;
    multiplicador: number;
    dataKey: string;
    filterBy: string;
    autofocus: boolean;
    resetFilterOnHide: boolean;
    dropdownIcon: string;
    optionLabel: string;
    autoDisplayFirst: boolean;
    group: boolean;
    showClear: boolean;
    emptyFilterMessage: string;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onChange: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    onKey: EventEmitter<any>;
    onAdd: EventEmitter<any>;
    onClear: EventEmitter<any>;
    containerViewChild: ElementRef;
    filterViewChild: ElementRef;
    focusViewChild: ElementRef;
    containerPanel: ElementRef;
    editableInputViewChild: ElementRef;
    templates: QueryList<any>;
    overlay: HTMLDivElement;
    itemsWrapper: HTMLDivElement;
    itemTemplate: TemplateRef<any>;
    groupTemplate: TemplateRef<any>;
    selectedItemTemplate: TemplateRef<any>;
    selectedOption: any;
    selectedIndex: number;
    _options: any[];
    value: any;
    focandoComMouse: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    optionsToDisplay: any[];
    hover: boolean;
    focused: boolean;
    filled: boolean;
    overlayVisible: boolean;
    documentClickListener: any;
    optionsChanged: boolean;
    panel: HTMLDivElement;
    dimensionsUpdated: boolean;
    selfClick: boolean;
    itemClick: boolean;
    clearClick: boolean;
    hoveredItem: any;
    selectedOptionUpdated: boolean;
    filterValue: string;
    searchValue: string;
    searchIndex: number;
    searchTimeout: any;
    previousSearchChar: string;
    currentSearchChar: string;
    documentResizeListener: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, cd: ChangeDetectorRef, objectUtils: ObjectUtils, zone: NgZone);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    options: any[];
    ngAfterViewInit(): void;
    readonly label: string;
    updateEditableLabel(): void;
    willShowOption(option: any): boolean;
    valueTypedIsPresent(): boolean;
    onItemClick(event: any, option: any): void;
    getFilterValue(): string;
    getAddLabel(): string;
    onAddNovo(event: any): void;
    selectItem(event: any, option: any): void;
    ngAfterViewChecked(): void;
    writeValue(value: any): void;
    resetFilter(): void;
    includeAddToOptionsToDisplay(): void;
    updateSelectedOption(val: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    updateDimensions(): void;
    focusInComponent(event: any): void;
    onMouseclick(event: any): void;
    onEditableInputClick(event: any): void;
    onEditableInputFocus(event: any): void;
    onEditableInputChange(event: any): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    dropDownFilter(event: any): void;
    hide(): void;
    alignOverlay(): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    findPrevEnabledOption(index: any): any;
    findNextEnabledOption(index: any): any;
    onKeydown(event: KeyboardEvent, search: boolean): void;
    search(event: any): void;
    searchOption(index: any): any;
    searchOptionInRange(start: any, end: any): any;
    searchOptionWithinGroup(index: any): any;
    findOptionIndex(val: any, opts: any[]): number;
    findOptionGroupIndex(val: any, opts: any[]): any;
    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem;
    onFilter(event: any): void;
    activateFilter(): void;
    applyFocus(): void;
    focus(): void;
    focusSearchInput(): void;
    bindDocumentClickListener(): void;
    clearClickState(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onWindowResize(): void;
    updateFilledState(): void;
    clear(event: Event): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class DropdownModule {
}

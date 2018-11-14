"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("./autocomplete");
var i2 = require("@angular/common");
var i3 = require("../inputtext/inputtext");
var i4 = require("../button/button");
var i5 = require("../common/shared");
var i6 = require("../dom/domhandler");
var i7 = require("@angular/forms");
var i8 = require("../utils/objectutils");
var AutoCompleteModuleNgFactory = i0.ɵcmf(i1.AutoCompleteModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i3.InputTextModule, i3.InputTextModule, []), i0.ɵmpd(1073742336, i4.ButtonModule, i4.ButtonModule, []), i0.ɵmpd(1073742336, i5.SharedModule, i5.SharedModule, []), i0.ɵmpd(1073742336, i1.AutoCompleteModule, i1.AutoCompleteModule, [])]); });
exports.AutoCompleteModuleNgFactory = AutoCompleteModuleNgFactory;
var styles_AutoComplete = [];
var RenderType_AutoComplete = i0.ɵcrt({ encapsulation: 2, styles: styles_AutoComplete, data: { "animation": [{ type: 7, name: "overlayAnimation", definitions: [{ type: 0, name: "void", styles: { type: 6, styles: { transform: "translateY(5%)", opacity: 0 }, offset: null }, options: undefined }, { type: 0, name: "visible", styles: { type: 6, styles: { transform: "translateY(0)", opacity: 1 }, offset: null }, options: undefined }, { type: 1, expr: "void => visible", animation: { type: 4, styles: null, timings: "{{showTransitionParams}}" }, options: null }, { type: 1, expr: "visible => void", animation: { type: 4, styles: null, timings: "{{hideTransitionParams}}" }, options: null }], options: {} }] } });
exports.RenderType_AutoComplete = RenderType_AutoComplete;
function View_AutoComplete_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[1, 0], ["in", 1]], null, 2, "input", [["autocomplete", "off"]], [[1, "type", 0], [1, "id", 0], [1, "required", 0], [8, "value", 0], [1, "placeholder", 0], [1, "size", 0], [1, "maxlength", 0], [1, "tabindex", 0], [8, "readOnly", 0], [8, "disabled", 0], [1, "aria-label", 0], [1, "aria-labelledby", 0], [1, "aria-required", 0]], [[null, "click"], [null, "input"], [null, "keydown"], [null, "keyup"], [null, "focus"], [null, "blur"], [null, "change"], [null, "paste"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onInputClick($event) !== false);
        ad = (pd_0 && ad);
    } if (("input" === en)) {
        var pd_1 = (_co.onInput($event) !== false);
        ad = (pd_1 && ad);
    } if (("keydown" === en)) {
        var pd_2 = (_co.onKeydown($event) !== false);
        ad = (pd_2 && ad);
    } if (("keyup" === en)) {
        var pd_3 = (_co.onKeyup($event) !== false);
        ad = (pd_3 && ad);
    } if (("focus" === en)) {
        var pd_4 = (_co.onInputFocus($event) !== false);
        ad = (pd_4 && ad);
    } if (("blur" === en)) {
        var pd_5 = (_co.onInputBlur($event) !== false);
        ad = (pd_5 && ad);
    } if (("change" === en)) {
        var pd_6 = (_co.onInputChange($event) !== false);
        ad = (pd_6 && ad);
    } if (("paste" === en)) {
        var pd_7 = (_co.onInputPaste($event) !== false);
        ad = (pd_7 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵdid(2, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_13 = _co.inputStyleClass; var currVal_14 = "ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input"; _ck(_v, 1, 0, currVal_13, currVal_14); var currVal_15 = _co.inputStyle; _ck(_v, 2, 0, currVal_15); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.type; var currVal_1 = _co.inputId; var currVal_2 = _co.required; var currVal_3 = _co.inputFieldValue; var currVal_4 = _co.placeholder; var currVal_5 = _co.size; var currVal_6 = _co.maxlength; var currVal_7 = _co.tabindex; var currVal_8 = _co.readonly; var currVal_9 = _co.disabled; var currVal_10 = _co.ariaLabel; var currVal_11 = _co.ariaLabelledBy; var currVal_12 = _co.required; _ck(_v, 0, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12]); }); }
function View_AutoComplete_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "ui-autocomplete-token-icon pi pi-fw pi-times"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeItem(i0.ɵnov(_v.parent, 0)) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, null); }
function View_AutoComplete_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "ui-autocomplete-token-label"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.field ? _co.objectUtils.resolveFieldData(_v.parent.context.$implicit, _co.field) : _v.parent.context.$implicit); _ck(_v, 1, 0, currVal_0); }); }
function View_AutoComplete_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AutoComplete_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [["token", 1]], null, 7, "li", [["class", "ui-autocomplete-token ui-state-highlight ui-corner-all"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_4)), i0.ɵdid(2, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_5)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_AutoComplete_6)), i0.ɵdid(6, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(7, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.disabled; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.selectedItemTemplate; _ck(_v, 4, 0, currVal_1); var currVal_2 = _ck(_v, 7, 0, _v.context.$implicit); var currVal_3 = _co.selectedItemTemplate; _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_AutoComplete_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[3, 0], ["multiContainer", 1]], null, 7, "ul", [["class", "ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 6).focus() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(2, { "ui-state-disabled": 0, "ui-state-focus": 1 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_3)), i0.ɵdid(4, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(5, 0, null, null, 2, "li", [["class", "ui-autocomplete-input-token"]], null, null, null, null, null)), (_l()(), i0.ɵeld(6, 0, [[2, 0], ["multiIn", 1]], null, 1, "input", [["autocomplete", "off"]], [[1, "type", 0], [1, "id", 0], [8, "disabled", 0], [1, "placeholder", 0], [1, "tabindex", 0], [8, "readOnly", 0], [8, "className", 0], [1, "aria-label", 0], [1, "aria-labelledby", 0], [1, "aria-required", 0]], [[null, "input"], [null, "click"], [null, "keydown"], [null, "keyup"], [null, "focus"], [null, "blur"], [null, "change"], [null, "paste"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (_co.onInput($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.onInputClick($event) !== false);
        ad = (pd_1 && ad);
    } if (("keydown" === en)) {
        var pd_2 = (_co.onKeydown($event) !== false);
        ad = (pd_2 && ad);
    } if (("keyup" === en)) {
        var pd_3 = (_co.onKeyup($event) !== false);
        ad = (pd_3 && ad);
    } if (("focus" === en)) {
        var pd_4 = (_co.onInputFocus($event) !== false);
        ad = (pd_4 && ad);
    } if (("blur" === en)) {
        var pd_5 = (_co.onInputBlur($event) !== false);
        ad = (pd_5 && ad);
    } if (("change" === en)) {
        var pd_6 = (_co.onInputChange($event) !== false);
        ad = (pd_6 && ad);
    } if (("paste" === en)) {
        var pd_7 = (_co.onInputPaste($event) !== false);
        ad = (pd_7 && ad);
    } return ad; }, null, null)), i0.ɵdid(7, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all"; var currVal_1 = _ck(_v, 2, 0, _co.disabled, _co.focus); _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_2 = _co.value; _ck(_v, 4, 0, currVal_2); var currVal_13 = _co.inputStyle; _ck(_v, 7, 0, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.type; var currVal_4 = _co.inputId; var currVal_5 = _co.disabled; var currVal_6 = ((_co.value && _co.value.length) ? null : _co.placeholder); var currVal_7 = _co.tabindex; var currVal_8 = _co.readonly; var currVal_9 = _co.inputStyleClass; var currVal_10 = _co.ariaLabel; var currVal_11 = _co.ariaLabelledBy; var currVal_12 = _co.required; _ck(_v, 6, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12); }); }
function View_AutoComplete_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "i", [["class", "ui-autocomplete-loader pi pi-spinner pi-spin"]], null, null, null, null, null))], null, null); }
function View_AutoComplete_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[4, 0], ["ddBtn", 1]], null, 2, "button", [["class", "ui-autocomplete-dropdown"], ["icon", "pi pi-fw pi-caret-down"], ["pButton", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.handleDropdownClick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i6.DomHandler, i6.DomHandler, []), i0.ɵdid(2, 4341760, null, 0, i4.ButtonDirective, [i0.ElementRef, i6.DomHandler], { icon: [0, "icon"] }, null)], function (_ck, _v) { var currVal_1 = "pi pi-fw pi-caret-down"; _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.disabled; _ck(_v, 0, 0, currVal_0); }); }
function View_AutoComplete_11(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.field ? _co.objectUtils.resolveFieldData(_v.parent.context.$implicit, _co.field) : _v.parent.context.$implicit); _ck(_v, 1, 0, currVal_0); }); }
function View_AutoComplete_12(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_AutoComplete_10(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "li", [], null, [[null, "mouseenter"], [null, "mouseleave"], [null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("mouseenter" === en)) {
        var pd_0 = ((_co.highlightOption = _v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } if (("mouseleave" === en)) {
        var pd_1 = ((_co.highlightOption = null) !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (_co.selectItem(_v.context.$implicit) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(2, { "ui-autocomplete-list-item ui-corner-all": 0, "ui-state-highlight": 1 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_11)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_AutoComplete_12)), i0.ɵdid(6, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(7, { $implicit: 0, index: 1 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, true, (_co.highlightOption == _v.context.$implicit)); _ck(_v, 1, 0, currVal_0); var currVal_1 = !_co.itemTemplate; _ck(_v, 4, 0, currVal_1); var currVal_2 = _ck(_v, 7, 0, _v.context.$implicit, _v.context.index); var currVal_3 = _co.itemTemplate; _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_AutoComplete_13(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "li", [["class", "ui-autocomplete-list-item ui-corner-all"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.emptyMessage; _ck(_v, 1, 0, currVal_0); }); }
function View_AutoComplete_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[5, 0], ["panel", 1]], null, 7, "div", [["class", "ui-autocomplete-panel ui-widget ui-widget-content ui-corner-all ui-shadow"]], [[4, "max-height", null], [24, "@overlayAnimation", 0]], [[null, "@overlayAnimation.start"], [null, "@overlayAnimation.done"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("@overlayAnimation.start" === en)) {
        var pd_0 = (_co.onOverlayAnimationStart($event) !== false);
        ad = (pd_0 && ad);
    } if (("@overlayAnimation.done" === en)) {
        var pd_1 = (_co.onOverlayAnimationDone($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵpod(1, { showTransitionParams: 0, hideTransitionParams: 1 }), i0.ɵpod(2, { value: 0, params: 1 }), (_l()(), i0.ɵeld(3, 0, null, null, 4, "ul", [["class", "ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_10)), i0.ɵdid(5, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_13)), i0.ɵdid(7, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.suggestions; _ck(_v, 5, 0, currVal_2); var currVal_3 = (_co.noResults && _co.emptyMessage); _ck(_v, 7, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.scrollHeight; var currVal_1 = _ck(_v, 2, 0, "visible", _ck(_v, 1, 0, _co.showTransitionOptions, _co.hideTransitionOptions)); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_AutoComplete_0(_l) { return i0.ɵvid(0, [i0.ɵqud(671088640, 1, { inputEL: 0 }), i0.ɵqud(671088640, 2, { multiInputEL: 0 }), i0.ɵqud(671088640, 3, { multiContainerEL: 0 }), i0.ɵqud(671088640, 4, { dropdownButton: 0 }), i0.ɵqud(671088640, 5, { containerPanel: 0 }), (_l()(), i0.ɵeld(5, 0, null, null, 13, "span", [], null, null, null, null, null)), i0.ɵdid(6, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(7, { "ui-autocomplete ui-widget": 0, "ui-autocomplete-dd": 1, "ui-autocomplete-multiple": 2 }), i0.ɵdid(8, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_1)), i0.ɵdid(10, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_2)), i0.ɵdid(12, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_7)), i0.ɵdid(14, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_8)), i0.ɵdid(16, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_AutoComplete_9)), i0.ɵdid(18, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = _ck(_v, 7, 0, true, _co.dropdown, _co.multiple); _ck(_v, 6, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 8, 0, currVal_2); var currVal_3 = !_co.multiple; _ck(_v, 10, 0, currVal_3); var currVal_4 = _co.multiple; _ck(_v, 12, 0, currVal_4); var currVal_5 = _co.loading; _ck(_v, 14, 0, currVal_5); var currVal_6 = _co.dropdown; _ck(_v, 16, 0, currVal_6); var currVal_7 = _co.overlayVisible; _ck(_v, 18, 0, currVal_7); }, null); }
exports.View_AutoComplete_0 = View_AutoComplete_0;
function View_AutoComplete_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "p-autoComplete", [], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null]], null, null, View_AutoComplete_0, RenderType_AutoComplete)), i0.ɵprd(5120, null, i7.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.AutoComplete]), i0.ɵprd(512, null, i6.DomHandler, i6.DomHandler, []), i0.ɵprd(512, null, i8.ObjectUtils, i8.ObjectUtils, []), i0.ɵdid(4, 9879552, null, 1, i1.AutoComplete, [i0.ElementRef, i6.DomHandler, i0.Renderer2, i8.ObjectUtils, i0.ChangeDetectorRef, i0.IterableDiffers], null, null), i0.ɵqud(603979776, 1, { templates: 1 })], function (_ck, _v) { _ck(_v, 4, 0); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 4).filled; var currVal_1 = (i0.ɵnov(_v, 4).focus && !i0.ɵnov(_v, 4).disabled); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
exports.View_AutoComplete_Host_0 = View_AutoComplete_Host_0;
var AutoCompleteNgFactory = i0.ɵccf("p-autoComplete", i1.AutoComplete, View_AutoComplete_Host_0, { minLength: "minLength", delay: "delay", style: "style", styleClass: "styleClass", inputStyle: "inputStyle", inputId: "inputId", inputStyleClass: "inputStyleClass", placeholder: "placeholder", readonly: "readonly", disabled: "disabled", maxlength: "maxlength", required: "required", size: "size", multiplicador: "multiplicador", appendTo: "appendTo", autoHighlight: "autoHighlight", forceSelection: "forceSelection", type: "type", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", field: "field", scrollHeight: "scrollHeight", dropdown: "dropdown", pseudoExcluir: "pseudoExcluir", excluirEmDuasEtapas: "excluirEmDuasEtapas", dropdownMode: "dropdownMode", multiple: "multiple", tabindex: "tabindex", dataKey: "dataKey", emptyMessage: "emptyMessage", immutable: "immutable", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", suggestions: "suggestions" }, { completeMethod: "completeMethod", onSelect: "onSelect", onUnselect: "onUnselect", onFocus: "onFocus", onBlur: "onBlur", onDropdownClick: "onDropdownClick", onClear: "onClear", onKeyUp: "onKeyUp", customValue: "customValue" }, []);
exports.AutoCompleteNgFactory = AutoCompleteNgFactory;
//# sourceMappingURL=autocomplete.ngfactory.js.map
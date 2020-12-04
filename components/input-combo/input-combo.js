"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var objectutils_1 = require("../utils/objectutils");
var forms_1 = require("@angular/forms");
exports.DROPDOWN_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputCombo; }),
    multi: true
};
var InputCombo = /** @class */ (function () {
    function InputCombo(el, domHandler, renderer, cd, objectUtils, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.objectUtils = objectUtils;
        this.zone = zone;
        this.scrollHeight = '200px';
        this.autoWidth = true;
        this.podeAdicionar = false;
        this.multiplicador = 1;
        this.loading = false;
        this.filterBy = 'label';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-caret-down';
        this.autoDisplayFirst = true;
        this.showArrow = false;
        this.emptyFilterMessage = 'Nenhum resultado encontrado.';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.onKey = new core_1.EventEmitter();
        this.buscouEnter = new core_1.EventEmitter();
        this.onAdd = new core_1.EventEmitter();
        this.onClear = new core_1.EventEmitter();
        this.selectedIndex = 0;
        this.focandoComMouse = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    InputCombo.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                case 'group':
                    _this.groupTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    InputCombo.prototype.ngOnInit = function () {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
        console.log("InputCombo.prototype.ngOnInit");
    };
    Object.defineProperty(InputCombo.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.optionsToDisplay = this._options;
            this.includeAddToOptionsToDisplay();
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
            if (this.filterValue && this.filterValue.length) {
                this.activateFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    InputCombo.prototype.ngAfterViewInit = function () {
        if (this.options == null) {
            this.options = [];
        }
        if (this.editable) {
            this.updateEditableLabel();
        }
        this.updateDimensions();
    };
    Object.defineProperty(InputCombo.prototype, "label", {
        get: function () {
            return (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    InputCombo.prototype.updateEditableLabel = function () {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
        }
    };
    InputCombo.prototype.willShowOption = function (option) {
        if (this.podeAdicionar) {
            if (option.value && option.value.isAdd) {
                if (this.valueTypedIsPresent()) {
                    return false;
                }
            }
        }
        return true;
    };
    InputCombo.prototype.valueTypedIsPresent = function () {
        if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
            for (var i = 0; i < this.optionsToDisplay.length; i++) {
                if (this.optionsToDisplay[i] && this.optionsToDisplay[i].value[this.optionLabel] && this.filterValue) {
                    if (this.optionsToDisplay[i].value[this.optionLabel].toLowerCase() == this.filterValue.toLowerCase()) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    InputCombo.prototype.onItemClick = function (event, option) {
        var _this = this;
        this.itemClick = true;
        if (!option.disabled) {
            this.selectItem(event, option);
            this.focusViewChild.nativeElement.focus();
            this.filled = true;
        }
        setTimeout(function () {
            _this.hide();
        }, 150);
    };
    InputCombo.prototype.getFilterValue = function () {
        if (this.filter && this.filterViewChild && this.filterViewChild.nativeElement) {
            return this.filterViewChild.nativeElement.value;
        }
        else {
            return "";
        }
    };
    InputCombo.prototype.getAddLabel = function () {
        return this.getFilterValue() == "" ? "novo" : this.getFilterValue();
    };
    InputCombo.prototype.onAddNovo = function (event) {
        var _this = this;
        this.onAdd.emit(this.getFilterValue());
        setTimeout(function () {
            _this.hide();
        }, 150);
    };
    InputCombo.prototype.selectItem = function (event, option) {
        if (option && option.value && option.value.isAdd) {
            this.onAddNovo(event);
            return;
        }
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    InputCombo.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.autoWidth && !this.dimensionsUpdated) {
            this.updateDimensions();
        }
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.updateDimensions();
                    _this.alignOverlay();
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            this.updateDimensions();
            var selectedItem = this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight');
            if (selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    };
    InputCombo.prototype.writeValue = function (value) {
        var _this = this;
        if (this.filter) {
            setTimeout(function () {
                _this.resetFilter();
            }, 50);
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    InputCombo.prototype.resetFilter = function () {
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterValue = null;
            this.filterViewChild.nativeElement.value = '';
        }
        this.optionsToDisplay = this.options;
        this.includeAddToOptionsToDisplay();
    };
    InputCombo.prototype.includeAddToOptionsToDisplay = function () {
        if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
            this.optionsToDisplay = this.optionsToDisplay.filter(function (option) { return option.value && !option.value.isAdd; });
        }
        if (this.podeAdicionar && !this.valueTypedIsPresent()) {
            var addItem = { label: 'Adicionar novo', value: { isAdd: true, id: -3 } };
            if (this.getFilterValue() == "") {
                addItem.value[this.optionLabel] = "<span class=\"adicionar-novo-dropdown\"><i class=\"fa fa-plus\"></i>&nbsp; Adicionar novo</span>";
            }
            else {
                addItem.value[this.optionLabel] = "<span class=\"adicionar-novo-dropdown\"><i class=\"fa fa-plus\"></i>&nbsp; Adicionar '" + this.getFilterValue() + "'</span>";
            }
            if (!this.optionsToDisplay) {
                this.optionsToDisplay = [];
            }
            this.optionsToDisplay.push(addItem);
        }
    };
    InputCombo.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        if (this.selectedOption == null && val && val[this.optionLabel]) {
            var newSelectedOption = {};
            newSelectedOption['label'] = val[this.optionLabel];
            newSelectedOption['value'] = val;
            this.selectedOption = newSelectedOption;
        }
        this.selectedOptionUpdated = true;
    };
    InputCombo.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputCombo.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputCombo.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    InputCombo.prototype.updateDimensions = function () {
        if (this.autoWidth && this.el.nativeElement && this.el.nativeElement.children[0] && this.el.nativeElement.offsetParent) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (select && !this.style || (this.style && (!this.style['width'] && !this.style['min-width']))) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
            this.dimensionsUpdated = true;
        }
    };
    InputCombo.prototype.focusInComponent = function (event) {
        var _this = this;
        if (!this.focandoComMouse && !this.overlayVisible) {
            this.show();
            setTimeout(function () {
                if (_this.filterViewChild != undefined) {
                    _this.filterViewChild.nativeElement.focus();
                }
            }, 20);
        }
    };
    InputCombo.prototype.onMouseclick = function (event) {
        var _this = this;
        this.focandoComMouse = true;
        if (this.disabled || this.readonly) {
            return;
        }
        this.onClick.emit(event);
        this.selfClick = true;
        this.clearClick = this.domHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        if (!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            if (this.overlayVisible) {
                this.hide();
                this.focandoComMouse = false;
            }
            else {
                this.show();
                setTimeout(function () {
                    if (_this.filterViewChild != undefined) {
                        _this.filterViewChild.nativeElement.focus();
                    }
                    _this.focandoComMouse = false;
                }, 200);
            }
        }
        else {
            this.focandoComMouse = false;
        }
    };
    InputCombo.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    InputCombo.prototype.onEditableInputFocus = function (event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    };
    InputCombo.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    InputCombo.prototype.show = function () {
        var _this = this;
        this.overlayVisible = true;
        var ddRect = this.el.nativeElement.getBoundingClientRect();
        setTimeout(function () {
            if (_this.containerPanel && _this.multiplicador != 1) {
                var maxSize = window.innerWidth - 50;
                var calculatedSize = (ddRect.width * _this.multiplicador) - 2;
                _this.containerPanel.nativeElement.style.width = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
                _this.containerPanel.nativeElement.style.minWidth = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
            }
        }, 50);
    };
    InputCombo.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.itemsWrapper = this.domHandler.findSingle(this.overlay, '.ui-dropdown-items-wrapper');
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                if (this.options && this.options.length) {
                    var selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
                    if (selectedListItem) {
                        this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
                    }
                }
                this.onShow.emit(event);
                break;
            case 'void':
                this.onHide.emit(event);
                this.onOverlayHide();
                break;
        }
    };
    InputCombo.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = this.domHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
        }
    };
    InputCombo.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    InputCombo.prototype.dropDownFilter = function (event) {
        this.onKey.emit(event);
    };
    InputCombo.prototype.hide = function () {
        this.overlayVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        this.cd.markForCheck();
    };
    InputCombo.prototype.alignOverlay = function () {
        if (this.overlay) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                this.domHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    };
    InputCombo.prototype.onInputFocus = function (event) {
        this.focused = true;
        this.onFocus.emit(event);
    };
    InputCombo.prototype.onInputBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    InputCombo.prototype.findPrevEnabledOption = function (index) {
        var prevEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index - 1); 0 <= i; i--) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }
            if (!prevEnabledOption) {
                for (var i = this.optionsToDisplay.length - 1; i >= index; i--) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return prevEnabledOption;
    };
    InputCombo.prototype.findNextEnabledOption = function (index) {
        var nextEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }
            if (!nextEnabledOption) {
                for (var i = 0; i < index; i++) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return nextEnabledOption;
    };
    InputCombo.prototype.onKeydown = function (event, search) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        if (selectedItemIndex !== -1) {
                            var nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        this.selectedIndex++;
                        if (this.selectedIndex >= this.optionsToDisplay.length)
                            this.selectedIndex = 0;
                        var nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            //this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (this.group) {
                    var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        var prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            var prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    this.selectedIndex--;
                    if (this.selectedIndex < 0)
                        this.selectedIndex = this.optionsToDisplay.length - 1;
                    var prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        //this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }
                event.preventDefault();
                break;
            //space
            case 32:
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //enter
            case 13:
                if (this.optionsToDisplay[this.selectedIndex]) {
                    if (this.optionsToDisplay[this.selectedIndex].value && this.optionsToDisplay[this.selectedIndex].value.isAdd) {
                        this.onAddNovo(event);
                    }
                    else {
                        this.selectItem(event, this.optionsToDisplay[this.selectedIndex]);
                        this.selectedOptionUpdated = true;
                    }
                }
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide();
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
            //search item based on keyboard input
            default:
                if (search) {
                    this.search(event);
                }
                break;
        }
    };
    InputCombo.prototype.onEnterKey = function ($event) {
        if (this.filterValue) {
            this.buscouEnter.emit(this.filterValue);
            this.hide();
        }
    };
    InputCombo.prototype.search = function (event) {
        var _this = this;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        var char = String.fromCharCode(event.keyCode);
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar)
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;
        var newOption;
        if (this.group) {
            var searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : { groupIndex: 0, itemIndex: 0 };
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            var searchIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }
        if (newOption) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }
        this.searchTimeout = setTimeout(function () {
            _this.searchValue = null;
        }, 250);
    };
    InputCombo.prototype.searchOption = function (index) {
        var option;
        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);
            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }
        return option;
    };
    InputCombo.prototype.searchOptionInRange = function (start, end) {
        for (var i = start; i < end; i++) {
            var opt = this.optionsToDisplay[i];
            if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                return opt;
            }
        }
        return null;
    };
    InputCombo.prototype.searchOptionWithinGroup = function (index) {
        var option;
        if (this.searchValue) {
            for (var i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (var j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.optionsToDisplay[i].items.length; j++) {
                    var opt = this.optionsToDisplay[i].items[j];
                    if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                        return opt;
                    }
                }
            }
            if (!option) {
                for (var i = 0; i <= index.groupIndex; i++) {
                    for (var j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.optionsToDisplay[i].items.length); j++) {
                        var opt = this.optionsToDisplay[i].items[j];
                        if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                            return opt;
                        }
                    }
                }
            }
        }
        return null;
    };
    InputCombo.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || this.objectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    InputCombo.prototype.findOptionGroupIndex = function (val, opts) {
        var groupIndex, itemIndex;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);
                if (itemIndex !== -1) {
                    break;
                }
            }
        }
        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        }
        else {
            return -1;
        }
    };
    InputCombo.prototype.findOption = function (val, opts, inGroup) {
        if (this.group && !inGroup) {
            var opt = void 0;
            if (opts && opts.length) {
                for (var _i = 0, opts_1 = opts; _i < opts_1.length; _i++) {
                    var optgroup = opts_1[_i];
                    opt = this.findOption(val, optgroup.items, true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            var index = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    };
    InputCombo.prototype.onFilter = function (event) {
        var inputValue = event.target.value;
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
            this.includeAddToOptionsToDisplay();
        }
        this.optionsChanged = true;
    };
    InputCombo.prototype.filtrarManualmente = function (filtro) {
        this.filterValue = filtro;
        this.activateFilter();
        this.optionsChanged = true;
    };
    InputCombo.prototype.activateFilter = function () {
        var searchFields = this.filterBy.split(',');
        this.selectedIndex = 0;
        if (this.options && this.options.length) {
            if (this.group) {
                var filteredGroups = [];
                for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                    var optgroup = _a[_i];
                    var filteredSubOptions = this.objectUtils.filter(optgroup.items, searchFields, this.filterValue.toLowerCase());
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({
                            label: optgroup.label,
                            value: optgroup.value,
                            items: filteredSubOptions
                        });
                    }
                }
                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue.toLowerCase());
                this.includeAddToOptionsToDisplay();
            }
            this.optionsChanged = true;
        }
    };
    InputCombo.prototype.applyFocus = function () {
        if (this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    InputCombo.prototype.focus = function () {
        this.applyFocus();
    };
    InputCombo.prototype.focusSearchInput = function () {
        this.applyFocus();
    };
    InputCombo.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.hide();
                    _this.unbindDocumentClickListener();
                }
                _this.clearClickState();
                _this.cd.markForCheck();
            });
        }
    };
    InputCombo.prototype.clearClickState = function () {
        this.selfClick = false;
        this.itemClick = false;
    };
    InputCombo.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    InputCombo.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    InputCombo.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    InputCombo.prototype.onWindowResize = function () {
        this.hide();
    };
    InputCombo.prototype.updateFilledState = function () {
        this.filled = (this.selectedOption != null);
    };
    InputCombo.prototype.clear = function (event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.onClear.emit(event);
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    };
    InputCombo.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.itemsWrapper = null;
    };
    InputCombo.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InputCombo.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InputCombo.prototype, "panelStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "panelStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "autoWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "podeAdicionar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InputCombo.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], InputCombo.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "filterPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "selectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], InputCombo.prototype, "multiplicador", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "loading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "filterBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "autofocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "resetFilterOnHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "dropdownIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "optionLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "autoDisplayFirst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "group", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "showClear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "showArrow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "emptyFilterMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputCombo.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], InputCombo.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputCombo.prototype, "hideTransitionOptions", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onHide", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onKey", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "buscouEnter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onAdd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], InputCombo.prototype, "onClear", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], InputCombo.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], InputCombo.prototype, "filterViewChild", void 0);
    __decorate([
        core_1.ViewChild('in'),
        __metadata("design:type", core_1.ElementRef)
    ], InputCombo.prototype, "focusViewChild", void 0);
    __decorate([
        core_1.ViewChild('containerPanel'),
        __metadata("design:type", core_1.ElementRef)
    ], InputCombo.prototype, "containerPanel", void 0);
    __decorate([
        core_1.ViewChild('editableInput'),
        __metadata("design:type", core_1.ElementRef)
    ], InputCombo.prototype, "editableInputViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], InputCombo.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], InputCombo.prototype, "options", null);
    InputCombo = __decorate([
        core_1.Component({
            selector: 'p-inputcombo',
            template: "\n         <div #container [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,\n            'ui-state-disabled':disabled, 'ui-dropdown-open':overlayVisible, 'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}\"\n            (click)=\"onMouseclick($event)\" (focusin)=\"focusInComponent($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\" *ngIf=\"autoWidth\">\n                <select [attr.id]=\"selectId\" [required]=\"required\" [attr.name]=\"name\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" tabindex=\"-1\" aria-hidden=\"true\">\n                    <option *ngIf=\"placeholder\">{{placeholder}}</option>\n                    <ng-container *ngIf=\"group\">\n                        <optgroup *ngFor=\"let option of options\" [attr.label]=\"option.label\">\n                            <option *ngFor=\"let option of option.items\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n                        <optgroup>\n                    </ng-container>\n                    <ng-container *ngIf=\"!group\">\n                        <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"selectedOption == option\">{{option.label}}</option>\n                    </ng-container>\n                </select>\n            </div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" role=\"listbox\"\n                    (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n            </div>\n            <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null) && !overlayVisible\">\n                <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n                <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n            </label>\n            <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null) && !overlayVisible\">{{placeholder||'empty'}}</label>\n            <div *ngIf=\"overlayVisible\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n                <input #filter type=\"text\" autocomplete=\"off\" [value]=\"filterValue||''\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                (keyup.enter)=\"onEnterKey($event)\" (input)=\"dropDownFilter($event.target.value);\" (keydown)=\"onKeydown($event, false)\">\n            </div>\n            <!-- <input #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ui-dropdown-label ui-inputtext ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n                        (click)=\"onEditableInputClick($event)\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\"> -->\n            <i class=\"ui-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n            <div *ngIf=\"showArrow\" class=\"ui-dropdown-trigger ui-state-default ui-corner-right\">\n                <span class=\"ui-dropdown-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div #containerPanel *ngIf=\"overlayVisible\" [ngClass]=\"'ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow'\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n                <!--<div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n                    <input #filter type=\"text\" autocomplete=\"off\" [value]=\"filterValue||''\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                    (keyup.enter)=\"onEnterKey($event)\" (input)=\"dropDownFilter($event.target.value);\" (keydown)=\"onKeydown($event, false)\">\n                    <span class=\"ui-dropdown-filter-icon pi\" [ngClass]=\"{'pi-search': !loading, 'pi-spinner pi-spin': loading}\"></span>\n                </div>-->\n                <div class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n                    <ul class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n                        <ng-container *ngIf=\"group\">\n                            <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n                                <li class=\"ui-dropdown-item-group\">\n                                    <span *ngIf=\"!groupTemplate\">{{optgroup.label||'empty'}}</span>\n                                    <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                                </li>\n                                <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}\"></ng-container>\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n                        </ng-container>\n                        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n                            <li *ngFor=\"let option of options;let i=index\" (click)=\"onItemClick($event, option)\"\n                                    [ngClass]=\"{'ui-dropdown-item ui-corner-all':true,\n                                                'ui-state-highlight':(selectedIndex == i),\n                                                'ui-state-disabled':(option.disabled),\n                                                'ui-dropdown-item-empty':!option.label||option.label.length === 0}\">\n                                <span *ngIf=\"!itemTemplate\">{{option.label||'empty'}}</span>\n                                <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option}\"></ng-container>\n                            </li>\n                        </ng-template>\n                        <li style=\"padding: 10px;\" *ngIf=\"filter && optionsToDisplay && optionsToDisplay.length === 0\">{{emptyFilterMessage}}</li>\n\t\t\t\t\t\t\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('overlayAnimation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    animations_1.transition('void => visible', animations_1.animate('{{showTransitionParams}}')),
                    animations_1.transition('visible => void', animations_1.animate('{{hideTransitionParams}}'))
                ])
            ],
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focused'
            },
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, exports.DROPDOWN_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, core_1.ChangeDetectorRef,
            objectutils_1.ObjectUtils, core_1.NgZone])
    ], InputCombo);
    return InputCombo;
}());
exports.InputCombo = InputCombo;
var InputComboModule = /** @class */ (function () {
    function InputComboModule() {
    }
    InputComboModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_1.SharedModule],
            exports: [InputCombo, shared_1.SharedModule],
            declarations: [InputCombo]
        })
    ], InputComboModule);
    return InputComboModule;
}());
exports.InputComboModule = InputComboModule;
//# sourceMappingURL=input-combo.js.map

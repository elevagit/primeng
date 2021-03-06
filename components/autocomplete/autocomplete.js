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
var common_1 = require("@angular/common");
var animations_1 = require("@angular/animations");
var inputtext_1 = require("../inputtext/inputtext");
var button_1 = require("../button/button");
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var objectutils_1 = require("../utils/objectutils");
var forms_1 = require("@angular/forms");
exports.AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AutoComplete; }),
    multi: true
};
var AutoComplete = /** @class */ (function () {
    /*@HostListener('keydown', ['$event']) onKeyPress(event) {
      if (event.key == "\\" && event.key == '"') {
        event.preventDefault();
      }
    }
  
    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
      this.validateFields(event);
    }*/
    function AutoComplete(el, domHandler, renderer, objectUtils, cd, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.objectUtils = objectUtils;
        this.cd = cd;
        this.differs = differs;
        this.minLength = 1;
        this.delay = 300;
        this.maxlength = 30;
        this.multiplicador = 1;
        this.type = 'text';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.completeMethod = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onUnselect = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onOpen = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onDropdownClick = new core_1.EventEmitter();
        this.onClear = new core_1.EventEmitter();
        this.onKeyUp = new core_1.EventEmitter();
        this.customValue = new core_1.EventEmitter();
        this.onAdd = new core_1.EventEmitter();
        this.onAddVazio = new core_1.EventEmitter();
        this.onDuplicado = new core_1.EventEmitter();
        this.onBackspace = new core_1.EventEmitter();
        this.onChipRestaurado = new core_1.EventEmitter();
        this.valorInternoModificado = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.pseudoExcluir = false;
        this.excluirEmDuasEtapas = false;
        this.dropdownMode = 'blank';
        this.podeAdicionar = false;
        this.podeDuplicados = false;
        this.immutable = true;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.overlayVisible = false;
        this.focus = false;
        this.inputFieldValue = null;
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(AutoComplete.prototype, "suggestions", {
        get: function () {
            return this._suggestions;
        },
        set: function (val) {
            this._suggestions = val;
            this.includeAddToOptionsToDisplay();
            if (this.immutable) {
                this.handleSuggestionsChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    AutoComplete.prototype.ngDoCheck = function () {
        if (!this.immutable) {
            var changes = this.differ.diff(this.suggestions);
            if (changes) {
                this.handleSuggestionsChange();
            }
        }
    };
    AutoComplete.prototype.ngAfterViewChecked = function () {
        var _this = this;
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if (this.suggestionsUpdated && this.overlay && this.overlay.offsetParent) {
            setTimeout(function () { return _this.alignOverlay(); }, 1);
            this.suggestionsUpdated = false;
        }
        if (this.highlightOptionChanged) {
            setTimeout(function () {
                var listItem = _this.domHandler.findSingle(_this.overlay, 'li.ui-state-highlight');
                if (listItem) {
                    _this.domHandler.scrollInView(_this.overlay, listItem);
                }
            }, 1);
            this.highlightOptionChanged = false;
        }
    };
    AutoComplete.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace("\\", "").replace('"', '');
            event.preventDefault();
        }, 100);
    };
    AutoComplete.prototype.includeAddToOptionsToDisplay = function () {
        if (this._suggestions && this._suggestions.length > 0) {
            this._suggestions = this._suggestions.filter(function (option) { return !option.isAdd; });
        }
        if (this.podeAdicionar && !this.valueTypedIsPresent()) {
            var addItem = { isAdd: true, id: -3 };
            if (this.getFilterValue() == "" || this.getFilterValue() == null || this.getFilterValue() == undefined) {
                addItem[this.colunaOpcao] = "<span class=\"adicionar-novo-dropdown\"><i class=\"fa fa-plus\"></i>&nbsp; Adicionar novo</span>";
                addItem['id'] = -5;
            }
            else {
                addItem[this.colunaOpcao] = "<span class=\"adicionar-novo-dropdown\"><i class=\"fa fa-plus\"></i>&nbsp; Adicionar '" + this.getFilterValue() + "'</span>";
            }
            if (!this._suggestions) {
                this._suggestions = [];
            }
            this._suggestions.push(addItem);
        }
    };
    AutoComplete.prototype.getFilterValue = function () {
        if (this.multiple && this.multiInputEL) {
            return this.multiInputEL.nativeElement.value || "";
        }
        else if (this.inputEL) {
            return this.inputEL.nativeElement.value || "";
        }
    };
    AutoComplete.prototype.valueTypedIsPresent = function () {
        if (this.suggestions && this.suggestions.length > 0) {
            for (var i = 0; i < this.suggestions.length; i++) {
                if (this.suggestions[i] && this.suggestions[i][this.field] && this.getFilterValue()) {
                    if (this.suggestions[i][this.field].toLowerCase() == this.getFilterValue().toLowerCase()) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    AutoComplete.prototype.getValueFiltradoAcao = function () {
        if (this.value) {
            return this.value.filter(function (obj) { return obj.acao != 3; });
        }
        else {
            return [];
        }
    };
    AutoComplete.prototype.onAddNovo = function (event) {
        var _this = this;
        this.onAdd.emit(this.getFilterValue());
        setTimeout(function () {
            _this.hide();
        }, 150);
    };
    AutoComplete.prototype.handleSuggestionsChange = function () {
        if (this._suggestions != null && this.loading) {
            this.highlightOption = null;
            if (this._suggestions.length) {
                this.noResults = false;
                if (!this.overlayVisible) {
                    this.show();
                }
                this.suggestionsUpdated = true;
                if (this.autoHighlight) {
                    this.highlightOption = this._suggestions[0];
                }
            }
            else {
                this.noResults = true;
                if (this.emptyMessage) {
                    if (!this.overlayVisible) {
                        this.show();
                    }
                    this.suggestionsUpdated = true;
                }
                else {
                    this.hide();
                }
            }
            this.loading = false;
        }
    };
    AutoComplete.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    AutoComplete.prototype.writeValue = function (value) {
        this.value = value;
        this.filled = this.value && this.value != '';
        this.updateInputField();
    };
    AutoComplete.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AutoComplete.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AutoComplete.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    AutoComplete.prototype.onInput = function (event) {
        var _this = this;
        if (!this.inputKeyDown) {
            return;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        var value = event.target.value;
        if (!this.multiple && !this.forceSelection) {
            this.onModelChange(value);
            this.valorInternoModificado.emit(this.value);
            this.customValue.emit(value);
        }
        if (value.length === 0) {
            this.hide();
            this.onClear.emit(event);
        }
        if (value.length >= this.minLength) {
            this.timeout = setTimeout(function () {
                _this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
            this.hide();
        }
        this.updateFilledState();
        this.inputKeyDown = false;
    };
    AutoComplete.prototype.onInputClick = function (event) {
        if (this.documentClickListener) {
            this.inputClick = true;
        }
        if (!this.overlayVisible) {
            this.show();
        }
    };
    AutoComplete.prototype.search = function (event, query) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }
        this.loading = true;
        this.completeMethod.emit({
            originalEvent: event,
            query: query
        });
    };
    AutoComplete.prototype.selectItem = function (option, focus) {
        var _this = this;
        if (focus === void 0) { focus = true; }
        var deveEmitir = true;
        if (this.multiple) {
            this.value = this.value || [];
            if (!Array.isArray(this.value)) {
                this.value = [].push(this.value);
            }
            var isRepetido = this.podeDuplicados ? false : this.value.some(function (opt) { return opt[_this.field].toUpperCase() == option[_this.field].toUpperCase(); });
            var isRepetidoChip = false;
            if (option.isAdd == true && this.multiInputEL.nativeElement.value.trim() != '') {
                isRepetidoChip = this.value.some(function (opt) { return opt[_this.field].toUpperCase() == _this.multiInputEL.nativeElement.value.toUpperCase(); });
            }
            var isPseudoExcluido = this.value.some(function (opt) { return opt[_this.field].toUpperCase() == option[_this.field].toUpperCase() && opt.acao == 3; });
            if (option && !isRepetido && !isPseudoExcluido) {
                if (option.isAdd && (this.multiInputEL.nativeElement.value.trim() == '' || isRepetidoChip == true)) {
                    this.multiInputEL.nativeElement.value = '';
                    return;
                }
                if (option.isAdd && this.multiInputEL.nativeElement.value.trim() != '') {
                    var newItem = {};
                    newItem['acao'] = 1;
                    newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
                    newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
                    newItem[this.field] = this.multiInputEL.nativeElement.value;
                    this.onAddNovo(null);
                    if (!this.podeAdicionar) {
                        this.value = this.value.concat([newItem]);
                        this.onModelChange(this.value);
                        this.valorInternoModificado.emit(this.value);
                    }
                }
                else if (!this.isSelected(option)) {
                    if (option.isAdd) {
                        this.onAddVazio.emit(null);
                        this.hide();
                        return;
                    }
                    option.acao = 1;
                    this.value = this.value.concat([option]);
                    this.onModelChange(this.value);
                    this.valorInternoModificado.emit(this.value);
                }
                this.multiInputEL.nativeElement.value = '';
            }
            else if (isPseudoExcluido) {
                option.acao = 2;
                for (var i = 0; i < this.value.length; i++) {
                    if (this.value[i][this.field] == option[this.field]) {
                        deveEmitir = false;
                        this.value[i].acao = null;
                        this.onChipRestaurado.emit({ id: i, chip: this.value[i] });
                    }
                }
            }
            else {
                deveEmitir = false;
                this.onDuplicado.emit(this.multiInputEL.nativeElement.value);
                this.multiInputEL.nativeElement.value = '';
            }
        }
        else {
            if (option.isAdd) {
                var newItem = {};
                newItem['acao'] = 1;
                newItem[this.colunaOpcao] = this.inputEL.nativeElement.value;
                newItem[this.field] = this.inputEL.nativeElement.value;
                this.value = newItem;
                this.onAddNovo(null);
                this.onModelChange(this.value);
                this.valorInternoModificado.emit(this.value);
            }
            else {
                this.inputEL.nativeElement.value = this.field ? this.objectUtils.resolveFieldData(option, this.field) || '' : option;
                this.value = option;
                this.onModelChange(this.value);
                this.valorInternoModificado.emit(this.value);
            }
        }
        if (!option.isAdd) {
            if (deveEmitir) {
                this.onSelect.emit(option);
            }
            if (focus) {
                this.focusInput();
            }
        }
        this.updateFilledState();
    };
    AutoComplete.prototype.show = function () {
        var _this = this;
        if (this.multiInputEL || this.inputEL) {
            var hasFocus = this.multiple ? document.activeElement == this.multiInputEL.nativeElement : document.activeElement == this.inputEL.nativeElement;
            if (!this.overlayVisible && hasFocus) {
                this.overlayVisible = true;
            }
        }
        var ddRect = this.el.nativeElement.getBoundingClientRect();
        setTimeout(function () {
            if (_this.containerPanel && _this.multiplicador != 1) {
                var maxSize = window.innerWidth - 50;
                var calculatedSize = (ddRect.width * _this.multiplicador) - 2;
                _this.containerPanel.nativeElement.style.width = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
                _this.containerPanel.nativeElement.style.minWidth = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
            }
        }, 50);
        this.onOpen.emit(null);
    };
    AutoComplete.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    AutoComplete.prototype.onOverlayAnimationDone = function (event) {
        /*if (event.toState === 'void') {
            this._suggestions = null;
        }*/
    };
    AutoComplete.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = this.domHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
        }
    };
    AutoComplete.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    AutoComplete.prototype.alignOverlay = function () {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
        else
            this.domHandler.relativePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
    };
    AutoComplete.prototype.hide = function () {
        this.overlayVisible = false;
    };
    AutoComplete.prototype.handleDropdownClick = function (event) {
        this.focusInput();
        var queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;
        if (this.dropdownMode === 'blank')
            this.search(event, '');
        else if (this.dropdownMode === 'current')
            this.search(event, queryValue);
        this.onDropdownClick.emit({
            originalEvent: event,
            query: queryValue
        });
    };
    AutoComplete.prototype.focusInput = function () {
        if (this.multiple)
            this.multiInputEL.nativeElement.focus();
        else
            this.inputEL.nativeElement.focus();
    };
    AutoComplete.prototype.focusSearchInput = function () {
        this.focusInput();
    };
    AutoComplete.prototype.removeByIndex = function (index) {
        this.value = this.value.filter(function (val, i) { return i != index; });
    };
    AutoComplete.prototype.removeItem = function (item, index) {
        var itemIndex = index || this.domHandler.index(item);
        var removedValue = this.value[itemIndex];
        console.log('removeItem', this.pseudoExcluir, this.excluirEmDuasEtapas, removedValue, this.value);
        if (this.pseudoExcluir && this.value[itemIndex].acao == 2) {
            this.value[itemIndex].acao = 3;
        }
        if (!this.excluirEmDuasEtapas) {
            var chip = { id: itemIndex, chip: removedValue };
            this.onUnselect.emit(chip);
        }
        if (!this.pseudoExcluir || this.value[itemIndex].acao == 1) {
            this.value = this.value.filter(function (val, i) { return i != itemIndex; });
        }
        this.onModelChange(this.value);
        this.valorInternoModificado.emit(this.value);
        this.updateFilledState();
    };
    /* removeItem(item: any) {
         let itemIndex = this.domHandler.index(item);
         let removedValue = this.value[itemIndex];
         this.value = this.value.filter((val, i) => i!=itemIndex);
         this.onModelChange(this.value);
         this.updateFilledState();
         this.onUnselect.emit(removedValue);
     }*/
    AutoComplete.prototype.onKeydown = function (event) {
        if (event.key == "\\" || event.key == '"') {
            event.preventDefault();
        }
        if (this.overlayVisible) {
            var highlightItemIndex = this.findOptionIndex(this.highlightOption);
            switch (event.which) {
                //down
                case 40:
                    if (highlightItemIndex != -1) {
                        var nextItemIndex = highlightItemIndex + 1;
                        if (nextItemIndex != (this.suggestions.length)) {
                            this.highlightOption = this.suggestions[nextItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    }
                    else {
                        this.highlightOption = this.suggestions[0];
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    if (highlightItemIndex > 0) {
                        var prevItemIndex = highlightItemIndex - 1;
                        this.highlightOption = this.suggestions[prevItemIndex];
                        this.highlightOptionChanged = true;
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                        this.hide();
                    }
                    event.preventDefault();
                    break;
                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;
                //tab
                /*case 9:
                  if (this.highlightOption) {
                    this.selectItem(this.highlightOption);
                  }
                  this.hide();
                  break;*/
                case 8:
                    this.onBackspace.emit(event);
                    break;
            }
        }
        else {
            switch (event.which) {
                //down
                case 40:
                    if (this.suggestions) {
                        this.search(event, event.target.value);
                    }
                    break;
                //enter
                case 13:
                    if (this.multiple && this.multiInputEL.nativeElement.value && !this.forceSelection) {
                        var newItem = {};
                        newItem['acao'] = 1;
                        newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
                        newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
                        newItem[this.field] = this.multiInputEL.nativeElement.value;
                        this.selectItem(newItem);
                    }
                    event.preventDefault();
                    break;
                //tab
                /*case 9:
                  if (this.multiple && this.multiInputEL.nativeElement.value && !this.forceSelection) {
                    let newItem = {};
                    newItem['acao'] = 1;
                    newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
                    newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
                    newItem[this.field] = this.multiInputEL.nativeElement.value;
                    this.selectItem(newItem);
                  }
                  this.hide();
                  break;
        */
                case 8:
                    this.onBackspace.emit(event);
                    break;
            }
        }
        /*if (this.multiple) {
            switch(event.which) {
                //backspace
                case 8:
                    if (this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
                        this.value = [...this.value];
                        const removedValue = this.value.pop();
                        this.onModelChange(this.value);
                        this.updateFilledState();
                        this.onUnselect.emit(removedValue);
                    }
                break;
            }
        }*/
        this.inputKeyDown = true;
    };
    AutoComplete.prototype.onKeyup = function (event) {
        this.onKeyUp.emit(event);
    };
    AutoComplete.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    AutoComplete.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
        /*if (this.multiple && this.multiInputEL.nativeElement.value && !this.forceSelection) { //REMOVIDO ADD NO FOCUS OUT
          let newItem = {};
          newItem['acao'] = 1;
          if (this.podeAdicionar) {
            newItem['isAdd'] = true;
          }
          newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
          newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
          newItem[this.field] = this.multiInputEL.nativeElement.value;
          this.selectItem(newItem);
        }*/
    };
    AutoComplete.prototype.onInputChange = function (event) {
        if (this.forceSelection && this.suggestions) {
            var valid = false;
            var inputValue = event.target.value.trim();
            if (this.suggestions) {
                for (var _i = 0, _a = this.suggestions; _i < _a.length; _i++) {
                    var suggestion = _a[_i];
                    var itemValue = this.field ? this.objectUtils.resolveFieldData(suggestion, this.field) : suggestion;
                    if (itemValue && inputValue === itemValue.trim()) {
                        valid = true;
                        this.selectItem(suggestion, false);
                        break;
                    }
                }
            }
            if (!valid) {
                if (this.multiple) {
                    this.multiInputEL.nativeElement.value = '';
                }
                else {
                    this.value = null;
                    this.inputEL.nativeElement.value = '';
                }
                this.onClear.emit(event);
                this.onModelChange(this.value);
                this.valorInternoModificado.emit(this.value);
            }
        }
    };
    AutoComplete.prototype.onInputPaste = function (event) {
        this.onKeydown(event);
    };
    AutoComplete.prototype.isSelected = function (val) {
        var selected = false;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    };
    AutoComplete.prototype.findOptionIndex = function (option) {
        var index = -1;
        if (this.suggestions) {
            for (var i = 0; i < this.suggestions.length; i++) {
                if (this.objectUtils.equals(option, this.suggestions[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    AutoComplete.prototype.updateFilledState = function () {
        if (this.multiple)
            this.filled = (this.value && this.value.length) || (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
        else
            this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');
        ;
    };
    AutoComplete.prototype.updateInputField = function () {
        var formattedValue = this.value ? (this.field ? this.objectUtils.resolveFieldData(this.value, this.field) || '' : this.value) : '';
        this.inputFieldValue = formattedValue;
        if (this.inputEL && this.inputEL.nativeElement) {
            this.inputEL.nativeElement.value = formattedValue;
        }
        this.updateFilledState();
    };
    AutoComplete.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (event.which === 3) {
                    return;
                }
                if (!_this.inputClick && !_this.isDropdownClick(event)) {
                    _this.hide();
                }
                _this.inputClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    AutoComplete.prototype.isDropdownClick = function (event) {
        if (this.dropdown) {
            var target = event.target;
            return (target === this.dropdownButton.nativeElement || target.parentNode === this.dropdownButton.nativeElement);
        }
        else {
            return false;
        }
    };
    AutoComplete.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    AutoComplete.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.overlay = null;
    };
    AutoComplete.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "delay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "maxlength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "multiplicador", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "autoHighlight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "forceSelection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "ariaLabelledBy", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "completeMethod", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onUnselect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onOpen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onDropdownClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onClear", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onKeyUp", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "customValue", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onAdd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onAddVazio", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onDuplicado", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onBackspace", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "onChipRestaurado", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoComplete.prototype, "valorInternoModificado", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "colunaChip", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "colunaOpcao", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "dropdown", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "pseudoExcluir", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "excluirEmDuasEtapas", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "dropdownMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "podeAdicionar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoComplete.prototype, "podeDuplicados", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoComplete.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoComplete.prototype, "immutable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoComplete.prototype, "hideTransitionOptions", void 0);
    __decorate([
        core_1.ViewChild('in'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "inputEL", void 0);
    __decorate([
        core_1.ViewChild('multiIn'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "multiInputEL", void 0);
    __decorate([
        core_1.ViewChild('multiContainer'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "multiContainerEL", void 0);
    __decorate([
        core_1.ViewChild('ddBtn'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "dropdownButton", void 0);
    __decorate([
        core_1.ViewChild('panel'),
        __metadata("design:type", core_1.ElementRef)
    ], AutoComplete.prototype, "containerPanel", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], AutoComplete.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], AutoComplete.prototype, "suggestions", null);
    AutoComplete = __decorate([
        core_1.Component({
            selector: 'p-autoComplete',
            template: "\n        <span [ngClass]=\"{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in [attr.type]=\"type\" [attr.id]=\"inputId\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" autocomplete=\"off\" [attr.required]=\"required\"\n            [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input'\" [value]=\"inputFieldValue\"\n            (click)=\"onInputClick($event)\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (keyup)=\"onKeyup($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\"\n            [attr.placeholder]=\"placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\"\n            ><ul *ngIf=\"multiple\" #multiContainer class=\"ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-disabled':disabled,'ui-state-focus':focus}\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value; let i = index\" [style.display]=\"val.acao == 3 ? 'none' : 'inline-block'\" class=\"ui-autocomplete-token ui-state-highlight ui-corner-all\">\n                    <span class=\"ui-autocomplete-token-icon pi pi-fw pi-times\" (click)=\"removeItem(token, i)\" *ngIf=\"!disabled\"></span>\n                    <span *ngIf=\"!selectedItemTemplate\" class=\"ui-autocomplete-token-label\">{{field ? objectUtils.resolveFieldData(val, field): val}}</span>\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: val}\"></ng-container>\n                </li>\n                <li class=\"ui-autocomplete-input-token\" (click)=\"onInputClick($event)\">\n                    <input #multiIn [attr.type]=\"type\" [attr.maxlength]=\"maxlength\" [attr.id]=\"inputId\" [disabled]=\"disabled\" [attr.placeholder]=\"(value&&value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" (input)=\"onInput($event)\"  (click)=\"onInputClick($event)\"\n                            (keydown)=\"onKeydown($event)\" [readonly]=\"readonly\" (keyup)=\"onKeyup($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\" autocomplete=\"off\" \n                            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\">\n                </li>\n            </ul\n            ><i *ngIf=\"loading\" class=\"ui-autocomplete-loader pi pi-spinner pi-spin\"></i><button #ddBtn type=\"button\" pButton icon=\"pi pi-fw pi-caret-down\" class=\"ui-autocomplete-dropdown\" [disabled]=\"disabled\"\n                (click)=\"handleDropdownClick($event)\" *ngIf=\"dropdown\"></button>\n            <div #panel *ngIf=\"overlayVisible\" class=\"ui-autocomplete-panel ui-widget ui-widget-content ui-corner-all ui-shadow\" [style.max-height]=\"scrollHeight\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\">\n                <ul class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\">\n                    <li *ngFor=\"let option of suggestions; let idx = index\" [ngClass]=\"{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}\"\n                        (mouseenter)=\"highlightOption=option\" (mouseleave)=\"highlightOption=null\" (click)=\"selectItem(option)\">\n                        <span *ngIf=\"!itemTemplate\">{{field ? objectUtils.resolveFieldData(option, field) : option}}</span>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: idx}\"></ng-container>\n                    </li>\n                    <li style=\"padding: 10px;\" *ngIf=\"noResults && emptyMessage\" class=\"ui-autocomplete-list-item ui-corner-all\">{{emptyMessage}}</li>\n                </ul>\n            </div>\n        </span>\n    ",
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
                '[class.ui-inputwrapper-focus]': 'focus && !disabled'
            },
            providers: [domhandler_1.DomHandler, objectutils_1.ObjectUtils, exports.AUTOCOMPLETE_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer2, objectutils_1.ObjectUtils, core_1.ChangeDetectorRef, core_1.IterableDiffers])
    ], AutoComplete);
    return AutoComplete;
}());
exports.AutoComplete = AutoComplete;
var AutoCompleteModule = /** @class */ (function () {
    function AutoCompleteModule() {
    }
    AutoCompleteModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, inputtext_1.InputTextModule, button_1.ButtonModule, shared_1.SharedModule],
            exports: [AutoComplete, shared_1.SharedModule],
            declarations: [AutoComplete]
        })
    ], AutoCompleteModule);
    return AutoCompleteModule;
}());
exports.AutoCompleteModule = AutoCompleteModule;
//# sourceMappingURL=autocomplete.js.map
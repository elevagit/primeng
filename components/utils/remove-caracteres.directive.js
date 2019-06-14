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
var RemoveCaracteresDirective = /** @class */ (function () {
    function RemoveCaracteresDirective(el) {
        this.el = el;
    }
    RemoveCaracteresDirective.prototype.onKeyPress = function (event) {
        if (event.key == "\\") {
            event.preventDefault();
        }
    };
    RemoveCaracteresDirective.prototype.blockPaste = function (event) {
        this.validateFields(event);
    };
    RemoveCaracteresDirective.prototype.validateFields = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.value = _this.el.nativeElement.value.replace("\\", "");
            event.preventDefault();
        }, 100);
    };
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], RemoveCaracteresDirective.prototype, "onKeyPress", null);
    __decorate([
        core_1.HostListener('paste', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], RemoveCaracteresDirective.prototype, "blockPaste", null);
    RemoveCaracteresDirective = __decorate([
        core_1.Directive({
            selector: '[removeCaracteres]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], RemoveCaracteresDirective);
    return RemoveCaracteresDirective;
}());
exports.RemoveCaracteresDirective = RemoveCaracteresDirective;
//# sourceMappingURL=remove-caracteres.directive.js.map
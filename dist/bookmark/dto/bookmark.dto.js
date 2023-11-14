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
exports.BookmarkDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BookmarkDTO {
}
exports.BookmarkDTO = BookmarkDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Titulo é obrigatório' }),
    (0, class_validator_1.IsString)({
        message: 'Titulo (field: title) deve ser uma string',
    }),
    __metadata("design:type", String)
], BookmarkDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'Titulo (field: title) deve ser uma string',
    }),
    __metadata("design:type", String)
], BookmarkDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'Titulo (field: title) deve ser uma string',
    }),
    __metadata("design:type", String)
], BookmarkDTO.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'UserId (field: userId) deve ser um número',
    }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], BookmarkDTO.prototype, "userId", void 0);
//# sourceMappingURL=bookmark.dto.js.map
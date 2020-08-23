"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Admin = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var enums_1 = require("./root/enums");
var Admin = (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Admin.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'first_name' }),
        class_validator_1.Length(1, 150),
        __metadata("design:type", String)
    ], Admin.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column({ name: 'last_name', nullable: true }),
        class_validator_1.Length(1, 1000),
        __metadata("design:type", String)
    ], Admin.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], Admin.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.Length(255),
        __metadata("design:type", String)
    ], Admin.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ name: 'contact_number', nullable: true }),
        class_validator_1.Length(20),
        __metadata("design:type", String)
    ], Admin.prototype, "contactNumber", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'status',
            type: 'enum',
            enum: enums_1.Status,
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Admin.prototype, "status", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            type: 'timestamp',
            default: function () { return 'CURRENT_TIMESTAMP(6)'; },
            name: 'created_at',
        }),
        __metadata("design:type", Date)
    ], Admin.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: 'timestamp',
            default: function () { return 'CURRENT_TIMESTAMP(6)'; },
            onUpdate: 'CURRENT_TIMESTAMP(6)',
            name: 'updated_at',
        }),
        __metadata("design:type", Date)
    ], Admin.prototype, "updatedAt", void 0);
    Admin = __decorate([
        typeorm_1.Entity({ name: 'admins' })
    ], Admin);
    return Admin;
}(typeorm_1.BaseEntity));
exports.Admin = Admin;

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
exports.TractorParcel = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Tractor_1 = require("./Tractor");
var Parcel_1 = require("./Parcel");
var TractorParcel = (function (_super) {
    __extends(TractorParcel, _super);
    function TractorParcel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], TractorParcel.prototype, "id", void 0);
    __decorate([
        typeorm_1.JoinColumn({ name: 'tractor_id' }),
        typeorm_1.Column('uuid', { name: 'tractor_id' }),
        typeorm_1.Index(),
        __metadata("design:type", String)
    ], TractorParcel.prototype, "tractorId", void 0);
    __decorate([
        typeorm_1.JoinColumn({ name: 'parcel_id' }),
        typeorm_1.Column('uuid', { name: 'parcel_id' }),
        typeorm_1.Index(),
        __metadata("design:type", String)
    ], TractorParcel.prototype, "parcelId", void 0);
    __decorate([
        typeorm_1.Column('date', { name: 'process_on' }),
        class_validator_1.IsDate(),
        __metadata("design:type", Date)
    ], TractorParcel.prototype, "processOn", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.Length(1, 255),
        __metadata("design:type", String)
    ], TractorParcel.prototype, "area", void 0);
    __decorate([
        typeorm_1.Column({ name: 'geo_location', type: 'geometry' }),
        __metadata("design:type", Object)
    ], TractorParcel.prototype, "geoLocation", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            type: 'timestamp',
            default: function () { return 'CURRENT_TIMESTAMP(6)'; },
            name: 'created_at',
        }),
        __metadata("design:type", Date)
    ], TractorParcel.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: 'timestamp',
            default: function () { return 'CURRENT_TIMESTAMP(6)'; },
            onUpdate: 'CURRENT_TIMESTAMP(6)',
            name: 'updated_at',
        }),
        __metadata("design:type", Date)
    ], TractorParcel.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Tractor_1.Tractor; }, function (tractor) { return tractor.tractorsParcels; }, {
            nullable: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }),
        typeorm_1.JoinColumn({ name: 'tractor_id' }),
        __metadata("design:type", Tractor_1.Tractor)
    ], TractorParcel.prototype, "tractor", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Parcel_1.Parcel; }, function (parcel) { return parcel.tractorsParcels; }, {
            nullable: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }),
        typeorm_1.JoinColumn({ name: 'parcel_id' }),
        __metadata("design:type", Parcel_1.Parcel)
    ], TractorParcel.prototype, "parcel", void 0);
    TractorParcel = __decorate([
        typeorm_1.Entity({ name: 'tractor_parcels' })
    ], TractorParcel);
    return TractorParcel;
}(typeorm_1.BaseEntity));
exports.TractorParcel = TractorParcel;

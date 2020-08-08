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
var Personas;
(function (Personas) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(id, nombre, apellido, edad, legajo, horario) {
            var _this = _super.call(this, id, nombre, apellido, edad) || this;
            _this.legajo = legajo;
            _this.horario = horario;
            return _this;
        }
        Empleado.prototype.getHorario = function () {
            return this.horario;
        };
        Empleado.prototype.setHorario = function (horario) {
            this.horario = horario;
        };
        Empleado.prototype.getLegajo = function () {
            return this.legajo;
        };
        Empleado.prototype.setLegajo = function (legajo) {
            this.legajo = legajo;
        };
        return Empleado;
    }(Personas.Persona));
    Personas.Empleado = Empleado;
})(Personas || (Personas = {}));

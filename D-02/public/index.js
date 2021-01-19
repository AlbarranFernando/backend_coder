"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const asd = './calculus';
const operacion = async (num1, num2, op) => {
    let calculo = null;
    switch (op) {
        case 'suma':
            calculo = await Promise.resolve().then(() => __importStar(require(asd))).then(m => m.suma);
            break;
        case 'resta':
            calculo = await Promise.resolve().then(() => __importStar(require(asd))).then(m => m.resta);
            break;
    }
    return new calculo(num1, num2).resultado();
};
const operaciones = async (num1, num2, op) => {
    let solucion = await operacion(num1, num2, op);
    console.log(solucion);
};
console.log("variable");
operaciones(8, 3, 'suma');
operaciones(8, 3, 'resta');

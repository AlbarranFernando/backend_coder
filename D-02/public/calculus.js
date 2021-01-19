"use strict";
class suma {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    resultado() {
        return this.num1 + this.num2;
    }
}
class resta {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    resultado() {
        return this.num1 - this.num2;
    }
}
module.exports = {
    suma, resta
};

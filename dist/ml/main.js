(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Mall rating\n  </h1>\n</div>\n<h2>Задача: предсказать покупательскую способность по возрасту покупателя. </h2>\n<p>Dataset: <a href=\"https://www.kaggle.com/vjchoudhary7/customer-segmentation-tutorial-in-python/version/1\">https://www.kaggle.com/vjchoudhary7/customer-segmentation-tutorial-in-python/version/1</a></p>\n<p style=\"white-space: pre-wrap;\"><b>Linear regression function:</b> {{linearRegressionResult}}</p>\n<p style=\"white-space: pre-wrap;\"><b>Logarithmic regression function:</b> {{logRegressionResult}}</p>\n<p style=\"white-space: pre-wrap;\"><b>Polynomial regression function:</b> {{polynomialRegressionResult}}</p>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! papaparse */ "./node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_3__);




var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.title = 'ml';
        this.linearRegressionResult = "---";
        this.polynomialRegressionResult = "---";
        this.logRegressionResult = "---";
        this.linearRegression = function (x, y) {
            var xs = 0; // sum(x)
            var ys = 0; // sum(y)
            var xxs = 0; // sum(x*x)
            var xys = 0; // sum(x*y)
            var yys = 0; // sum(y*y)
            var n = 0;
            for (; n < x.length && n < y.length; n++) {
                xs += x[n];
                ys += y[n];
                xxs += x[n] * x[n];
                xys += x[n] * y[n];
                yys += y[n] * y[n];
            }
            var div = n * xxs - xs * xs;
            var a = (n * xys - xs * ys) / div;
            var b = (ys * xxs - xs * xys) / div;
            var correlation = Math.abs((xys * n - xs * ys) / Math.sqrt((xxs * n - xs * xs) * (yys * n - ys * ys)));
            console.log(correlation);
            return { a: a, b: b };
        };
        this.linearPredict = function (lr, x) {
            return Math.round((x * lr.a + lr.b) * 100) / 100;
        };
        this.linearError = function (lr, x, y) {
            var predictedValues = [];
            var averageValue = 0;
            var totalSum = 0;
            var resSum = 0;
            var rSquared = 0;
            for (var i = 0; i < x.length; i++) {
                averageValue += y[i];
            }
            averageValue = (averageValue / y.length);
            for (var i = 0; i < x.length; i++) {
                totalSum += Math.pow(y[i] - averageValue, 2);
                predictedValues.push(_this.linearPredict(lr, x[i]));
                resSum += Math.pow(predictedValues[i] - y[i], 2);
            }
            rSquared = 1 - (resSum / totalSum);
            return Math.round(rSquared * 100) / 100;
        };
        this.gaussianElimination = function (input, order) {
            var matrix = input;
            var n = input.length - 1;
            var coefficients = [order];
            for (var i = 0; i < n; i++) {
                var maxrow = i;
                for (var j = i + 1; j < n; j++) {
                    if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][maxrow])) {
                        maxrow = j;
                    }
                }
                for (var k = i; k < n + 1; k++) {
                    var tmp = matrix[k][i];
                    matrix[k][i] = matrix[k][maxrow];
                    matrix[k][maxrow] = tmp;
                }
                for (var j = i + 1; j < n; j++) {
                    for (var k = n; k >= i; k--) {
                        matrix[k][j] -= (matrix[k][i] * matrix[i][j]) / matrix[i][i];
                    }
                }
            }
            for (var j = n - 1; j >= 0; j--) {
                var total = 0;
                for (var k = j + 1; k < n; k++) {
                    total += matrix[k][j] * coefficients[k];
                }
                coefficients[j] = (matrix[n][j] - total) / matrix[j][j];
            }
            return coefficients;
        };
        this.polynomialRegression = function (x, y, k) {
            var lhs = [];
            var rhs = [];
            var a = 0;
            var b = 0;
            var len = x.length;
            // const k = 13;
            for (var i = 0; i < k; i++) {
                for (var l = 0; l < len; l++) {
                    a += (Math.pow(x[l], i)) * y[l];
                }
                lhs.push(a);
                a = 0;
                var c = [];
                for (var j = 0; j < k; j++) {
                    for (var l = 0; l < len; l++) {
                        b += Math.pow(x[l], (i + j));
                    }
                    c.push(b);
                    b = 0;
                }
                rhs.push(c);
            }
            rhs.push(lhs);
            var coefficients = _this.gaussianElimination(rhs, k);
            var predict = function (x) { return (coefficients.reduce(function (sum, coeff, power) { return sum + (coeff * (Math.pow(x, power))); }, 0)); };
            // const points = data.map(point => predict(point[0]));
            var string = 'y = ';
            for (var i = coefficients.length - 1; i >= 0; i--) {
                if (i > 1) {
                    string += coefficients[i] + "x^" + i + " + ";
                }
                else if (i === 1) {
                    string += coefficients[i] + "x + ";
                }
                else {
                    string += coefficients[i];
                }
            }
            return {
                string: string,
                predict: predict,
                equation: coefficients.slice().reverse(),
            };
        };
        this.polynomialError = function (predictFunc, x, y) {
            var predictedValues = [];
            var averageValue = 0;
            var totalSum = 0;
            var resSum = 0;
            var rSquared = 0;
            for (var i = 0; i < x.length; i++) {
                averageValue += y[i];
            }
            averageValue = (averageValue / y.length);
            for (var i = 0; i < x.length; i++) {
                totalSum += Math.pow(y[i] - averageValue, 2);
                predictedValues.push(predictFunc(x[i]));
                resSum += Math.pow(predictedValues[i] - y[i], 2);
            }
            rSquared = 1 - (resSum / totalSum);
            return Math.round(rSquared * 100) / 100;
        };
        this.logarithmicRegression = function (x, y) {
            var sum = [0, 0, 0, 0];
            var len = x.length;
            for (var n = 0; n < len; n++) {
                sum[0] += Math.log(x[n]);
                sum[1] += y[n] * Math.log(x[n]);
                sum[2] += y[n];
                sum[3] += (Math.pow(Math.log(x[n]), 2));
            }
            var a = ((len * sum[1]) - (sum[2] * sum[0])) / ((len * sum[3]) - (sum[0] * sum[0]));
            var coeffB = a;
            var coeffA = (sum[2] - (coeffB * sum[0])) / len;
            var predict = function (x) { return (coeffA + (coeffB * Math.log(x))); };
            return {
                predict: predict,
                equation: [coeffA, coeffB],
                string: "y = " + coeffA + " + " + coeffB + " ln(x)",
            };
        };
        this.logarithmicError = function (predictFunc, x, y) {
            var predictedValues = [];
            var averageValue = 0;
            var totalSum = 0;
            var resSum = 0;
            var rSquared = 0;
            for (var i = 0; i < x.length; i++) {
                averageValue += y[i];
            }
            averageValue = (averageValue / y.length);
            for (var i = 0; i < x.length; i++) {
                totalSum += Math.pow(y[i] - averageValue, 2);
                predictedValues.push(predictFunc(x[i]));
                resSum += Math.pow(predictedValues[i] - y[i], 2);
            }
            rSquared = 1 - (resSum / totalSum);
            return Math.round(rSquared * 100) / 100;
        };
        this.http.get('https://raw.githubusercontent.com/PulshaAndrei/ML/master/Mall_Customers.csv', { responseType: 'text' }).subscribe(function (data) {
            _this.dataset = papaparse__WEBPACK_IMPORTED_MODULE_3__["parse"](data).data;
            _this.dataset.splice(0, 1);
            _this.dataset.splice(_this.dataset.length - 1, 1);
            var splitNumber = Math.round(_this.dataset.length * 0.8);
            var dev = _this.dataset.slice(0, splitNumber);
            var test = _this.dataset.slice(splitNumber, _this.dataset.length);
            var leftDev = dev.map(function (el) { return parseInt(el[2]); });
            var rightDev = dev.map(function (el) { return parseInt(el[4]); });
            var leftTest = test.map(function (el) { return parseInt(el[2]); });
            var rightTest = test.map(function (el) { return parseInt(el[4]); });
            var lr = _this.linearRegression(leftDev, rightDev);
            _this.linearRegressionResult = 'y = x * ' + lr.a + ' + ' + lr.b + "\n";
            _this.linearRegressionResult += "Result: " + _this.linearError(lr, leftTest, rightTest) + "\n";
            for (var i = 0; i < dev.length; i++) {
                var res = _this.linearPredict(lr, leftDev[i]);
                // this.linearRegressionResult += leftDev[i] + " " + rightDev[i] + " " + res + "\n";
            }
            var logr = _this.logarithmicRegression(leftDev, rightDev);
            _this.logRegressionResult = logr.string + "\n";
            _this.logRegressionResult += "Result: " + _this.logarithmicError(logr.predict, leftTest, rightTest) + "\n";
            for (var k = 3; k < 10; k++) {
                var pr = _this.polynomialRegression(leftDev, rightDev, k);
                _this.polynomialRegressionResult += pr.string + "(k = " + k + ")" + "\n";
                _this.polynomialRegressionResult += "Result: " + _this.polynomialError(pr.predict, leftTest, rightTest) + "\n";
            }
        });
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! d:\dev\machine-learning\ml\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
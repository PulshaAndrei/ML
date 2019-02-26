import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ml';

  linearRegressionResult = "---";
  polynomialRegressionResult = "---";
  logRegressionResult = "---";

  dataset;

  linearRegression = (x, y) => {
	    var xs = 0;  // sum(x)
	    var ys = 0;  // sum(y)
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

	    return { a, b };
	}

	linearPredict = (lr, x) => {
		return Math.round((x*lr.a + lr.b) * 100) / 100;
	}

	linearError = (lr, x, y) => {
	    var predictedValues = [];

	    var averageValue = 0;
	    var totalSum = 0;
	    var resSum = 0;
	    var rSquared = 0;

	    for (var i=0; i < x.length; i++) { averageValue += y[i]; }
	    averageValue = (averageValue / y.length);
	    
	    for (var i=0; i < x.length; i++) { 
	        totalSum += Math.pow(y[i] - averageValue, 2);
	        predictedValues.push(this.linearPredict(lr, x[i]));
	        resSum += Math.pow(predictedValues[i] - y[i], 2);
	    }

	    rSquared = 1 - (resSum / totalSum);
		return Math.round(rSquared * 100) / 100;
	}

	gaussianElimination = (input, order) => {
	  const matrix = input;
	  const n = input.length - 1;
	  const coefficients = [order];

	  for (let i = 0; i < n; i++) {
	    let maxrow = i;
	    for (let j = i + 1; j < n; j++) {
	      if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][maxrow])) {
	        maxrow = j;
	      }
	    }

	    for (let k = i; k < n + 1; k++) {
	      const tmp = matrix[k][i];
	      matrix[k][i] = matrix[k][maxrow];
	      matrix[k][maxrow] = tmp;
	    }

	    for (let j = i + 1; j < n; j++) {
	      for (let k = n; k >= i; k--) {
	        matrix[k][j] -= (matrix[k][i] * matrix[i][j]) / matrix[i][i];
	      }
	    }
	  }

	  for (let j = n - 1; j >= 0; j--) {
	    let total = 0;
	    for (let k = j + 1; k < n; k++) {
	      total += matrix[k][j] * coefficients[k];
	    }

	    coefficients[j] = (matrix[n][j] - total) / matrix[j][j];
	  }

	  return coefficients;
	}

	polynomialRegression = (x, y, k) => {
	    const lhs = [];
	    const rhs = [];
	    let a = 0;
	    let b = 0;
	    const len = x.length;
	    // const k = 13;

	    for (let i = 0; i < k; i++) {
	      	for (let l = 0; l < len; l++) {
	        	a += (x[l] ** i) * y[l];
	      	}
	      	lhs.push(a);
	     	a = 0;

	     	const c = [];
		    for (let j = 0; j < k; j++) {
		        for (let l = 0; l < len; l++) {
		          	b += x[l] ** (i + j);
		        }
		        c.push(b);
		        b = 0;
		    }
		    rhs.push(c);
	    }
	    rhs.push(lhs);

	    const coefficients = this.gaussianElimination(rhs, k);

	    const predict = x => (coefficients.reduce((sum, coeff, power) => sum + (coeff * (x ** power)), 0));

	    // const points = data.map(point => predict(point[0]));

	    let string = 'y = ';
	    for (let i = coefficients.length - 1; i >= 0; i--) {
	      if (i > 1) {
	        string += `${coefficients[i]}x^${i} + `;
	      } else if (i === 1) {
	        string += `${coefficients[i]}x + `;
	      } else {
	        string += coefficients[i];
	      }
	    }

	    return {
	      string,
	      predict,
	      equation: [...coefficients].reverse(),
	    };
	};

	polynomialError = (predictFunc, x, y) => {
	    var predictedValues = [];

	    var averageValue = 0;
	    var totalSum = 0;
	    var resSum = 0;
	    var rSquared = 0;

	    for (var i=0; i < x.length; i++) { averageValue += y[i]; }
	    averageValue = (averageValue / y.length);
	    
	    for (var i=0; i < x.length; i++) { 
	        totalSum += Math.pow(y[i] - averageValue, 2);
	        predictedValues.push(predictFunc(x[i]));
	        resSum += Math.pow(predictedValues[i] - y[i], 2);
	    }

	    rSquared = 1 - (resSum / totalSum);
		return Math.round(rSquared * 100) / 100;
	}

	logarithmicRegression = (x, y) => {
	    const sum = [0, 0, 0, 0];
	    const len = x.length;

	    for (let n = 0; n < len; n++) {
	    	sum[0] += Math.log(x[n]);
	        sum[1] += y[n] * Math.log(x[n]);
	        sum[2] += y[n];
	        sum[3] += (Math.log(x[n]) ** 2);
	    }

	    const a = ((len * sum[1]) - (sum[2] * sum[0])) / ((len * sum[3]) - (sum[0] * sum[0]));
	    const coeffB = a;
	    const coeffA = (sum[2] - (coeffB * sum[0])) / len;

	    const predict = x => (coeffA + (coeffB * Math.log(x)));

	    return {
	      predict,
	      equation: [coeffA, coeffB],
	      string: `y = ${coeffA} + ${coeffB} ln(x)`,
	    };
	}

	logarithmicError = (predictFunc, x, y) => {
	    var predictedValues = [];

	    var averageValue = 0;
	    var totalSum = 0;
	    var resSum = 0;
	    var rSquared = 0;

	    for (var i=0; i < x.length; i++) { averageValue += y[i]; }
	    averageValue = (averageValue / y.length);
	    
	    for (var i=0; i < x.length; i++) { 
	        totalSum += Math.pow(y[i] - averageValue, 2);
	        predictedValues.push(predictFunc(x[i]));
	        resSum += Math.pow(predictedValues[i] - y[i], 2);
	    }

	    rSquared = 1 - (resSum / totalSum);
		return Math.round(rSquared * 100) / 100;
	}

	

constructor(private http: HttpClient) {
  	this.http.get('https://raw.githubusercontent.com/PulshaAndrei/ML/master/Mall_Customers.csv', {responseType: 'text'}).subscribe(data => {
	    this.dataset = Papa.parse(data).data;
	    this.dataset.splice(0, 1);
	    this.dataset.splice(this.dataset.length - 1, 1);

	    const splitNumber = Math.round(this.dataset.length * 0.8);

	    const dev = this.dataset.slice(0, splitNumber);
	    const test = this.dataset.slice(splitNumber, this.dataset.length);

	    const leftDev = dev.map(el => parseInt(el[2]));
	    const rightDev = dev.map(el => parseInt(el[4]));

	    const leftTest = test.map(el => parseInt(el[2]));
	    const rightTest= test.map(el => parseInt(el[4]));

	    const lr = this.linearRegression(leftDev, rightDev);
	    this.linearRegressionResult = 'y = x * ' + lr.a + ' + ' + lr.b + "\n";
		this.linearRegressionResult += "Result: " +  this.linearError(lr, leftTest, rightTest) + "\n";

	    for (var i = 0; i < dev.length; i++) {
			const res = this.linearPredict(lr, leftDev[i])
			// this.linearRegressionResult += leftDev[i] + " " + rightDev[i] + " " + res + "\n";
		}

		const logr = this.logarithmicRegression(leftDev, rightDev);
	    this.logRegressionResult = logr.string + "\n";
		this.logRegressionResult += "Result: " +  this.logarithmicError(logr.predict, leftTest, rightTest) + "\n";


		for (var k = 3; k < 10; k++) {
			const pr = this.polynomialRegression(leftDev, rightDev, k);

			this.polynomialRegressionResult += pr.string + "(k = " + k + ")" + "\n";
			this.polynomialRegressionResult += "Result: " +  this.polynomialError(pr.predict, leftTest, rightTest) + "\n";
		}
	})
  }
}

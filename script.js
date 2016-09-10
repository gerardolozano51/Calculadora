/** Variables Globales **/
var meses = 24;
var monto = 30002;
var interes = 2;
const iva = 16;
var obj = {};

/** -- **/

let start = function(){
	//setValues();
	calculate();
};

let setValues = function(){
	meses   		 = document.getElementById("meses").innerHTML;
	monto   		 = document.getElementById("monto").innerHTML;
	interes 		 = document.getElementById("interes").innerHTML;
	interesMoratorio = document.getElementById("interesMoratorio").innerHTML;
};

let objectStructure = function(value){
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

let calculate = function(){
	var suma = 0;
	for (var i = 0; i <= meses; i++) {
		if (i == 0){
				obj[i] = {
					pago		: i,
			   		abono		: 0,
			   		saldo		: monto,
			   		interes 	: 0,
			   		iva			: 0,
			   		mensualidad : 0
				}
		}
		else {
			var abono 				= ( monto / meses );
			var interesCalculate 	= ( ((obj[i - 1].saldo) * interes) / 100);
			var ivaInteresCalculate = ((interesCalculate * iva) / 100);
			obj[i] = {
				pago		: i,
		   		abono		: abono.toFixed(2),
		   		saldo		: round(( (obj[i - 1].saldo) - abono ),2),
		   		interes 	: interesCalculate.toFixed(2), 
		   		iva			: ivaInteresCalculate.toFixed(2),
		   		mensualidad : (abono.toFixed(2) + interesCalculate.toFixed(2) + ivaInteresCalculate.toFixed(2))
			}
		}
		suma = parseFloat(suma) + parseFloat(obj[i].mensualidad);
	}
	console.log(obj)
}


window.onload = start;
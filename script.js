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
	viewTable();
};

let setValues = function(){
	meses   		 = document.getElementById("meses").innerHTML;
	monto   		 = document.getElementById("monto").innerHTML;
	interes 		 = document.getElementById("interes").innerHTML;
	interesMoratorio = document.getElementById("interesMoratorio").innerHTML;
};


let calculate = function(){
	var sumaAbono = 0;
	var sumaInteres = 0;
	var sumaIva = 0;
	var sumaMensualidad = 0;
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
				pago		: parseFloat(i),
		   		abono		: parseFloat(abono),
		   		saldo		: parseFloat(( (obj[i - 1].saldo) - abono )),
		   		interes 	: parseFloat(interesCalculate), 
		   		iva			: parseFloat(ivaInteresCalculate),
		   		mensualidad : (parseFloat(abono) + parseFloat(interesCalculate) + parseFloat(ivaInteresCalculate))
			}
		}
		if (i == meses){
			if(obj[i].mensualidad < 0){
				obj[i].mensualidad = 0;
				console.log("Hola");
			}
			for (var a = 1; a <= meses; a++) {
				sumaAbono += obj[a].abono;
				sumaInteres += obj[a].interes;
				sumaIva += obj[a].iva;
				sumaMensualidad += obj[a].mensualidad;

			}
			obj[i+1] = {
				sumaAbono : sumaAbono.toFixed(2),
				sumaInteres : sumaInteres.toFixed(2),
				sumaIva : sumaIva.toFixed(2),
				sumaMensualidad : sumaMensualidad.toFixed(2)

			}
		}
	}
}

let viewTable = function(){
	var table  = document.getElementById("ts")

	for (var i = 0; i <= meses; i++) {
		
		table.innerHTML +=`<tr>
			<td class="tg-031e">${i}</td>
			<td class="tg-031e">${obj[i].abono.toFixed(2)}</td>
			<td class="tg-yw4l">${obj[i].saldo.toFixed(2)}</td>
			<td class="tg-yw4l">${obj[i].interes.toFixed(2)}</td>
			<td class="tg-yw4l">${obj[i].iva.toFixed(2)}</td>
			<td class="tg-yw4l">${obj[i].mensualidad.toFixed(2)}</td>
		</tr>`;

		if (i == meses) {
			table.innerHTML += `<tr>
				<td class="tg-031e"></td>
				<td class="tg-031e">${obj[i+1].sumaAbono}</td>
				<td class="tg-yw4l"></td>
				<td class="tg-yw4l">${obj[i+1].sumaInteres}</td>
				<td class="tg-yw4l">${obj[i+1].sumaIva}</td>
				<td class="tg-yw4l">${obj[i+1].sumaMensualidad}</td>
			</tr>`;
		}
	}
}


window.onload = start;
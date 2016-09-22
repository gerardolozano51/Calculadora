/** Variables Globales **/


var meses;
var monto;
var interes;
const iva = 16;
var obj = {};
var nombrePrestamo = {};


/** -- **/

let start = function(){
	prestamos();
	infoPrestamos();
};

let calculo = function(){
	setValores();
	console.log(meses +" + " + monto +" + "+interes)
	calcular();
	//mostrarTabla();
}

let setValores = function(){
	monto   		 = document.getElementById("monto").value;
	interes 		 = document.getElementById("interes").innerHTML;
};

let prestamos = function(){
	nombrePrestamo[1] = {
		id       : '1',
		prestamo : 'Ordinario',
		interes  : '2',
		ahorro   : '500'
	}
	nombrePrestamo[2] = {
		id       : '2',
		prestamo : 'Extraordinario',
		interes  : '3',
		ahorro   : '1500'
	}
	nombrePrestamo[3] = {
		id       : '3',
		prestamo : 'Emergencia',
		interes  : '4',
		ahorro   : '4500'
	}
	nombrePrestamo[4] = {
		id       : '4',
		prestamo : 'Simple',
		interes  : '5',
		ahorro   : '6500'
	}
	nombrePrestamo[5] = {
		id       : '5',
		prestamo : 'CrediAuto',
		interes  : '6',
		ahorro   : '2500'
	}
}

let infoPrestamos = function(){
	var selectPrestamo  = document.getElementById("prestamos");
	var tamano = 0;

	selectPrestamo.innerHTML +=`
		<option value = "-1" selected disabled> -- Selecionar --</option>
	`;
	for (var key in nombrePrestamo) {
    	tamano ++;
  	}
  	for (var i = 1; i <= tamano; i++) {
		
		selectPrestamo.innerHTML +=`
			<option value = "${nombrePrestamo[i].id}">${nombrePrestamo[i].prestamo}</option>
		`;
	}

}

let infoInteresAhorro = function(){
	var selectPrestamo  = document.getElementById("prestamos");
	var campoInteres  = document.getElementById("interes");
	var campoAhorro  = document.getElementById("ahorro");

	if(nombrePrestamo == 'undefined'){
  	
	}
	else{
		campoInteres.innerHTML =`
			${nombrePrestamo[selectPrestamo.value].interes}
		`;

		campoAhorro.innerHTML =`
			${nombrePrestamo[selectPrestamo.value].ahorro}
		`;
	}
}

let infoMeses = function(){
	meses 	= document.getElementById("meses").value;
}


let calcular = function(){
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

let mostrarTabla = function(){
	var table  = document.getElementById("ts")
	//table.innerHTML = "";

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
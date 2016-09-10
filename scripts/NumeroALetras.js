
/*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/
function Unidades(num){

    switch(num)
    {
        case 1: return "Un";
        case 2: return "Dos";
        case 3: return "Tres";
        case 4: return "Cuatro";
        case 5: return "Cinco";
        case 6: return "Seis";
        case 7: return "Siete";
        case 8: return "Ocho";
        case 9: return "Nueve";
    }

    return "";
}//Unidades()

function Decenas(num){

    decena = Math.floor(num/10);
    unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "Diez";
                case 1: return "Once";
                case 2: return "Doce";
                case 3: return "Trece";
                case 4: return "Catorce";
                case 5: return "Quince";
                default: return "Dieci" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "Veinte";
                default: return "Veinti" + Unidades(unidad);
            }
        case 3: return DecenasY("Treinta", unidad);
        case 4: return DecenasY("Cuarenta", unidad);
        case 5: return DecenasY("Cincuenta", unidad);
        case 6: return DecenasY("Sesenta", unidad);
        case 7: return DecenasY("Setenta", unidad);
        case 8: return DecenasY("Ochenta", unidad);
        case 9: return DecenasY("Noventa", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

    return strSin;
}//DecenasY()

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "Ciento " + Decenas(decenas);
            return "Cien";
        case 2: return "Doscientos" + Decenas(decenas);
        case 3: return "Trescientos" + Decenas(decenas);
        case 4: return "Cuatrocientos" + Decenas(decenas);
        case 5: return "Quinientos" + Decenas(decenas);
        case 6: return "Seiscientos" + Decenas(decenas);
        case 7: return "Setecientos" + Decenas(decenas);
        case 8: return "Ochosientos" + Decenas(decenas);
        case 9: return "Novecientos" + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, "Mil", "Mil");
    strCentenas = Centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMillones = Seccion(num, divisor, "Un Millon", "Millones");
    strMiles = Miles(resto);

    if(strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'Pesos',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'Peso', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "Centavos",
        letrasMonedaCentavoSingular: "Centavo"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "Con " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };

    if(data.enteros == 0)
        return "Cero " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}


function MostrarValor(){
    var numero = document.getElementById("monto").value
    document.getElementById("total").innerHTML = NumeroALetras(numero);
}
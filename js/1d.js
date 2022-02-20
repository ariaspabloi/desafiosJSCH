function main1d() {
    let option = 0;
    let total = 0;
    console.log("Bienvenidos a compra de productos, elegir entre los productos 1,2,3,4");
    do {
        console.log("Ingrese el numero del articulo 1,2,3,4 o ingrese 0 para salir");
        option = parseInt(prompt("Que articulo desea agregar?"));
        total += price(option);
    } while (option != 0);
    console.log("Total final: $" + total);
}



function price(n) {
    if (n < 0 || n > 4) {
        console.log("Opcion ingresada no esta dentro del rango");
        return 0;
    }
    switch (n) {
        case 1:
            return 100;
        case 2:
            return 300;
        case 3:
            return 600;
        case 4:
            return 200;
        default:
            return 0;
    }
}
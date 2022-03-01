class Ramen {
    constructor(nombre, precio, ingredientes, disponible = true) {
        this.nombre = nombre;
        this.precio = precio;
        this.ingredientes = ingredientes;
        this.disponible = disponible;
    }

    detail() {
        console.log(this.nombre + " a " + this.precio + ", hecho de " + this.ingredientes);
    }
}

class Orden {
    cantidad = [];

    constructor(ramenes) {
        this.ramenes = ramenes;
        this.initCantidad();
    }

    initCantidad() {
        for (let i = 0; i < this.ramenes.length; i++) {
            this.cantidad[i] = 0;
        }
    }

    addProduct(i) {
        if (i >= 0 || i < this.ramenes.length) ++this.cantidad[i];
    }

    getDetail() {
        console.log("Detalle de orden");
        for (let i = 0; i < this.ramenes.length; i++) {
            console.log(this.ramenes[i].nombre + ": " + this.cantidad[i]);
        }
        ramenes.forEach(r => console.log(r.nombre + ": " + r.cantidad));
        console.log("Total:" + this.getTotal());
    }

    getTotal() {
        let total = 0;
        for (let i = 0; i < this.ramenes.length; i++) {
            total += this.ramenes[i].precio * this.cantidad[i];
        }
        return total;
    }
}



function main1f() {
    const ramenes = [];
    ramenes.push(new Ramen("Ribu ramen", 12000, ["Caldo de costilla", "Zanahoria", "Cebollin", "Dientes de dragon", "Carne de cerdo", "Huevo"]));
    ramenes.push(new Ramen("Vegie Ramen", 10000, ["Caldo de verduras", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Zucchini", "Huevo"]));
    ramenes.push(new Ramen("Tori Ramen", 12500, ["Caldo de pollo", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Pollo"]));
    const orden = new Orden(ramenes);

    for (const r of ramenes) r.detail();

    let option = 0;
    console.log("Bienvenidos a compra de productos, elegir entre los productos 1,2,3");
    do {
        console.log("Ingrese el numero del articulo 1,2,3 o ingrese 0 para salir");
        option = parseInt(prompt("Que articulo desea agregar?"));
        orden.addProduct(option - 1);
    } while (option != 0);
    orden.getDetail();
}
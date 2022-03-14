class Ramen {
    constructor(id, nombre, precio, ingredientes, disponible = true) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.ingredientes = ingredientes;
        this.disponible = disponible;
    }

    detail() {
        alert(this.id + ": " + this.nombre + " a " + this.precio + ", hecho de " + this.ingredientes);
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
        if (i >= 0 && i < this.ramenes.length) ++this.cantidad[i];
    }

    removeProduct(i) {
        if (i >= 0 && i < this.ramenes.length && this.cantidad[i] > 0) --this.cantidad[i];
    }

    getDetail() {
        let detail = "";
        for (let i = 0; i < this.ramenes.length; i++) {
            detail += this.ramenes[i].nombre + ": " + this.cantidad[i] + ", \n";
        }
        detail += "Total:" + this.getTotal();
        return detail;
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
    //Creacion de ramenes y de orden
    let option = 0;
    const ramenes = [];

    ramenes.push(new Ramen(1, "Ribu ramen", 12000, ["Caldo de costilla", "Zanahoria", "Cebollin", "Dientes de dragon", "Carne de cerdo", "Huevo"]));
    ramenes.push(new Ramen(2, "Vegie Ramen", 10000, ["Caldo de verduras", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Zucchini", "Huevo"]));
    ramenes.push(new Ramen(3, "Tori Ramen", 12500, ["Caldo de pollo", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Pollo"]));
    const orden = new Orden(ramenes);

    //Mostrar ramenes
    alert("Detalles de ramen 1,2,3 disponibles");
    for (const r of ramenes) r.detail();
    //Menu
    do {
        option = parseInt(prompt("Ingrese articulo u operacion , o ingrese 4 para buscar por ingrediente o ingrese 0 para salir"));
        if (option == 4) {
            //Buscar por ingrediente
            filtrarPorIngrediente(ramenes);
            continue;
        }
        //Ingresar producto
        orden.addProduct(option - 1);
    } while (option != 0);
    //Detalle de ordenes
    alert(orden.getDetail());
}

function filtrarPorIngrediente(ramenes) {
    let ingrediente = prompt("Que ingrediente busca");
    let ramenesFiltrados = ramenes.filter(r => r.ingredientes.includes(ingrediente));
    ramenesFiltrados.forEach(r => r.detail());
}
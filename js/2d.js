function main2d() {
    alert("Desafio N2 corriendo!");
    let status = document.getElementById("challenges__status-d2");
    status.innerHTML = "Desafio N2 corriendo!";

    //Creacion de ramenes y de orden
    const ramenes = [];
    ramenes.push(new Ramen(1, "Ribu ramen", 12000, ["Caldo de costilla", "Zanahoria", "Cebollin", "Dientes de dragon", "Carne de cerdo", "Huevo"]));
    ramenes.push(new Ramen(2, "Vegie Ramen", 10000, ["Caldo de verduras", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Zucchini", "Huevo"]));
    ramenes.push(new Ramen(3, "Tori Ramen", 12500, ["Caldo de pollo", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Pollo"]));
    const orden = new Orden(ramenes);

    //Mostrar ramenes
    alert("Detalles de ramen 1,2,3 disponibles");
    for (const r of ramenes) r.detail();

    //Configurar Botones
    let addProduct1 = document.getElementById("addProduct1");
    let removeProduct1 = document.getElementById("removeProduct1");
    addProduct1.onclick = () => { orden.addProduct(0); };
    removeProduct1.onclick = () => { orden.removeProduct(0); };

    let addProduct2 = document.getElementById("addProduct2");
    let removeProduct2 = document.getElementById("removeProduct2");
    addProduct2.onclick = () => { orden.addProduct(1); };
    removeProduct2.onclick = () => { orden.removeProduct(1); };

    let addProduct3 = document.getElementById("addProduct3");
    let removeProduct3 = document.getElementById("removeProduct3");
    addProduct3.onclick = () => { orden.addProduct(2); };
    removeProduct3.onclick = () => { orden.removeProduct(2); };

    let showDetail = document.getElementById("showDetail");
    showDetail.onclick = () => alert(orden.getDetail());
}
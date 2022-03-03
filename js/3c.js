function main3c() {
    const name = prompt("Cual es tu nombre");
    let box = document.querySelector("#box-c2");
    box.innerHTML = `<p>Hola ${name}<p>`;

    const ramenes = [];
    ramenes.push(new Ramen(1, "Ribu ramen", 12000, ["Caldo de costilla", "Zanahoria", "Cebollin", "Dientes de dragon", "Carne de cerdo", "Huevo"]));
    ramenes.push(new Ramen(2, "Vegie Ramen", 10000, ["Caldo de verduras", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Zucchini", "Huevo"]));
    ramenes.push(new Ramen(3, "Tori Ramen", 12500, ["Caldo de pollo", "Zanahoria", "Cebollin", "Dientes de dragon", "Champiñones", "Pollo"]));
    const orden = new Orden(ramenes);

    //Mostrar ramenes
    alert("Detalles de ramen 1,2,3 disponibles");
    for (const r of ramenes) r.detail();



    const ul = document.createElement('ul');
    ramenes.forEach(r => {
        //Crear contadores
        const li = document.createElement('li');

        li.innerHTML = `${r.nombre}: <p style="display:inline-block;" id="ramen${r.id}">0</>`;
        li.setAttribute('style', 'display: block;');
        ul.appendChild(li);

    });
    box.appendChild(ul);

    let option;
    let counter;
    do {
        option = option = parseInt(prompt("Ingrese numero de articulo, o 0 para salir"));
        orden.addProduct(option - 1);
        counter = document.querySelector(`#ramen${option}`);
        if (option > 0 && option < 4) counter.textContent = orden.cantidad[option - 1];
    } while (option != 0);
    const p = document.createElement('p');
    p.innerHTML = orden.getDetail();
    box.appendChild(p);
}
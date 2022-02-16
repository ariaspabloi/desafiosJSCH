function factorial() {
    let n = parseInt(prompt("Elegir numero factorial"));
    if (n < 0) {
        alert("Factorial de negativo no admitido");
    } else {
        let resultado = 1;
        for (let i = n; i >= 1; i--) {
            resultado *= i;

        }
        alert("Factorial de n!=" + resultado);
    }
}
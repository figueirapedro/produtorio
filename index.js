const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

function produtorioIterativo(n, m) {
    let resultado = 0;

    let x = Number.parseInt(m) + (1 / m);

    for (let i = m; i <= n; i++) {
        resultado = resultado + (x * i);
    }

    return resultado;
}

function produtorioRecursivo(n, m, valor) {
    let x = valor;

    if (Number.parseInt(m) == Number.parseInt(n))
        return n;
    else
        return x * produtorioRecursivo(n, Number.parseInt(m) + 1, x)
}

app.post("/produtorio/:metodo/:limiteInferior/:limiteSuperior", (req, res) => {

    let resposta;

    if (!(req.params.limiteInferior > 0) || !(req.params.limiteInferior > 0))
        throw "Limite Inferior e Superior devem ser maiores que zero";

    if(req.params.metodo != "iterativo" && req.params.metodo != "recursivo")
        throw "Escolha entre Iterativo e Recursivo"

        let x = Number.parseInt(req.params.limiteInferior) + (1 / req.params.limiteInferior);


    if (req.params.metodo == "iterativo")
        resposta = produtorioIterativo(req.params.limiteSuperior, req.params.limiteInferior);
    else if (req.params.metodo == "recursivo")
        resposta = produtorioRecursivo(req.params.limiteSuperior, req.params.limiteInferior, x);

    res.send({ "resultado": resposta });
})

app.listen(3000);
console.log("Executando...");


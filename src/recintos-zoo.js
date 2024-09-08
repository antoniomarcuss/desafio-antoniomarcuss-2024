class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: [{ especie: "MACACO", quantidade: 3 }],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanho: 7,
        animais: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      {
        numero: 5,
        bioma: "savana",
        tamanho: 9,
        animais: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"] },
      LEOPARDO: { tamanho: 2, biomas: ["savana"] },
      CROCODILO: { tamanho: 3, biomas: ["rio"] },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"] },
      GAZELA: { tamanho: 2, biomas: ["savana"] },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"] },
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, biomas } = this.animais[animal];
    const recintosViaveis = [];

    for (const recinto of this.recintos) {
      if (!biomas.includes(recinto.bioma)) {
        continue;
      }

      const espacoOcupado = recinto.animais.reduce(
        (total, a) => total + a.quantidade * this.animais[a.especie].tamanho,
        0
      );
      const espacoNecessario = quantidade * tamanho;

      if (espacoOcupado + espacoNecessario <= recinto.tamanho) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            recinto.tamanho - espacoOcupado - espacoNecessario
          } total: ${recinto.tamanho})`
        );
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

console.log(new RecintosZoo().analisaRecintos("MACACO", 2));
console.log(new RecintosZoo().analisaRecintos("UNICORNIO", 1));

export { RecintosZoo as RecintosZoo };

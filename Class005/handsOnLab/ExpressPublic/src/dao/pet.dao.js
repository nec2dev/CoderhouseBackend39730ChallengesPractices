import fs from "fs";

class PetManager {
  constructor() {
    this.path = "./src/data/pets.json";
  }

  leerArchivo = async () => {
    try {
      const pets = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(pets);
    } catch (error) {
      return [];
    }
  };

  createPet = async (pet) => {
    let pets = await this.leerArchivo();
    if (pets.length === 0) {
      pets.push({ id: 1, ...pet });
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(pets, null, 2),
        "utf-8"
      );
      return pets;
    }
    pets.push({ id: pets.length + 1, ...pet });
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(pets, null, 2),
      "utf-8"
    );
    return pets;
  };

  getPetById = async (pid) => {
    let petsDb = await this.leerArchivo();
    let pet = petsDb.find((pet) => pet.id === pid);
    if (!pet) {
      return "There is no pet";
    }
    return pet;
  };
}

module.exports = { PetManager };

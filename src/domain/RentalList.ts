import type { BikeType, Rental } from "./Rental.ts";

export class RentalList {
  #items: Rental[] = [];

  add(item: Rental): void {
    const exists = this.#items.some(
      (rental) => rental.bikeCode === item.bikeCode,
    );
    if (exists) {
      throw new Error("Esa bicicleta ya está alquilada.");
    }
    this.#items.push(item);
  }

  remove(_bikeCode: string): void {
    // TODO: eliminar el alquiler de esa bicicleta
    /*let lista_nueva = this.getItems().filter((r) => r.bikeCode !== _bikeCode);
    if(lista_nueva.length == this.getItems().length){
      throw new Error("No hay ninguna bicicleta con ese codigo.");
    }
    this.#items = lista_nueva;*/

    const pos: number = this.getItems().findIndex((r) => r.bikeCode == _bikeCode)
    if(pos==-1) throw new Error("No hay ninguna bicicleta con ese codigo.");
    this.#items.splice(pos);
  }

  getItems(): readonly Rental[] {
    return [...this.#items];
  }

  getByType(type: BikeType): readonly Rental[] {
    return this.#items.filter((rental) => rental.bikeType === type);
  }

  totalIncome(): number {
    return this.#items.reduce((total, rental) => total + rental.cost(), 0);
  }

  totalLateFees(): number {
    // TODO: sumar los recargos por atraso de todos los alquileres
    let fees: number = 0;
    for(let r of this.getItems()){
      fees += r.pricePerHour*r.lateHours*2;
    }
    return fees;
    //return this.#items.reduce((total, rental) => total + rental.pricePerHour*(rental.lateHours*2), 0);
  }
}

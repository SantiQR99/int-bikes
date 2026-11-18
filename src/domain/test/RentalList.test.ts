import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import { RentalList } from "../RentalList.ts";

describe("RentalList", () => {
  let list: RentalList;
  let rental: Rental;

  beforeEach(() => {
    list = new RentalList();
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
    });
  });

  test("Create an empty rental list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a rental", () => {
    list.add(rental);
    expect(list.getItems()).toEqual([rental]);
  });

  test("reject a bike that is already rented", () => {
    list.add(rental);
    expect(() => list.add(rental)).toThrow();
  });

  test("filter rentals by type", () => {
    list.add(rental);
    expect(list.getByType("urban")).toEqual([rental]);
    expect(list.getByType("electric")).toEqual([]);
  });

  test("total income", () => {
    list.add(rental);
    expect(list.totalIncome()).toBe(300);
  });

  test("total late fees", () => {
    rental.lateHours = 2;
    list.add(rental);
    expect(list.totalLateFees()).toBe(400);
  });

  test("total late fees with no late fees", () => {
    list.add(rental);
    expect(list.totalLateFees()).toBe(0);
  });

  test("Remove bike", () => {
    list.add(rental);
    list.remove("B-123");
    expect(list.getItems()).toStrictEqual([]);
  });

  test("Remove with no bikes", () => {
    expect(() => list.remove("B-156")).toThrow();
  });

  test("Remove bike code that isnt on the list", () => {
    list.add(rental);
    expect(() => list.remove("B-156")).toThrow();
  });

  test("Remove with invalid bike code", () => {
    list.add(rental);
    expect(() => list.remove("B-ñji156")).toThrow();
  });
});

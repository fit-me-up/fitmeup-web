import {
  jeans,
  sweater,
  skirt,
  jeanshorts,
  shorts,
  longsleeve,
  dress,
  jacket,
  scarf,
} from "../icons/clothes/clothes";

function determineBottom(shape: number, material: number, formality: number) {
  switch (shape?.toString()) {
    case "3":
      return skirt;
    case "4":
      if (formality.toString() == "0") {
        return "dresspants";
      } else {
        if (material.toString() == "3" || material.toString() == "2") {
          return jeans;
        } else {
          return "sweatpants";
        }
      }
    case "5":
      if (material.toString() == "3" || material.toString() == "2") {
        return jeanshorts;
      } else {
        return shorts;
      }
  }
}

function determineTOP(
  subcategory: number,
  material: number,
  formality: number
) {
  switch (subcategory.toString()) {
    case "0":
      if (formality.toString() == "0") {
        return longsleeve;
      } else {
        return longsleeve;
      }
    case "1":
      return longsleeve;
    case "2":
      return longsleeve;
  }
}

function determineFullBody(subcategory: number) {
  switch (subcategory.toString()) {
    case "9":
      return dress;
    case "10":
      return "suit";
    case "11":
      return "romper";
  }
}

function determineShoe(subcategory: number) {
  switch (subcategory.toString()) {
    case "6":
      return "sneaker";
    case "7":
      return "boot";
    case "8":
      return "sandal";
  }
}

function determineOuterwear(subcategory: number) {
  switch (subcategory.toString()) {
    case "12":
      return sweater;
    case "13":
      return jacket;
    case "14":
      return "cardigan";
  }
}

function determineAccessory(subcategory: number) {
  switch (subcategory.toString()) {
    case "14":
      return "hat";
    case "15":
      return scarf;
    case "16":
      return "bag";
  }
}

export function determineCategory(
  category: number,
  subcategory: number,
  material: number,
  formality: number
) {
  switch (category.toString()) {
    case "0":
      return determineTOP(subcategory, material, formality);
    case "1":
      return determineBottom(subcategory, material, formality);
    case "2":
      return determineFullBody(subcategory);
    case "3":
      return determineShoe(subcategory);
    case "4":
      return determineOuterwear(subcategory);
    case "5":
      return determineAccessory(subcategory);
    default:
      console.log("Unknown or undefined category:", category);
  }
}

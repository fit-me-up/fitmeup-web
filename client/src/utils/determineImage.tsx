import {
  boots,
  cardigan,
  dress,
  dresspants,
  jacket,
  jeans,
  jeanshorts,
  longsleeve,
  romper,
  shorts,
  skirt,
  sneakers,
  scarf,
  shortsleeve,
  buttondown,
  sweatpants,
  nosleeve,
  hat,
  bag,
  sandals,
  suit,
  sweatshirt,
} from "../icons/clothes/clothes";
import { Subcategory, Formality, Category, Material } from "../items/enums";

function determineBottom(shape: number, material: number, formality: number) {
  switch (shape?.toString()) {
    case Subcategory.Skirt.toString():
      return skirt;
    case Subcategory.Pants.toString():
      if (formality.toString() == Formality.Formal.toString()) {
        return dresspants;
      } else {
        if (
          material.toString() == Material.Denim.toString() ||
          material.toString() == Material.Leather.toString()
        ) {
          return jeans;
        } else {
          return sweatpants;
        }
      }
    case Subcategory.Shorts.toString():
      if (
        material.toString() == Material.Denim.toString() ||
        material.toString() == Material.Leather.toString()
      ) {
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
    case Subcategory.LongSleeve.toString():
      if (formality.toString() == Formality.Formal.toString()) {
        return buttondown;
      } else {
        return longsleeve;
      }
    case Subcategory.ShortSleeve.toString():
      return shortsleeve;
    case Subcategory.NoSleeve.toString():
      return nosleeve;
  }
}

function determineFullBody(subcategory: number) {
  switch (subcategory.toString()) {
    case Subcategory.Dress.toString():
      return dress;
    case Subcategory.Suit.toString():
      return suit;
    case Subcategory.Romper.toString():
      return romper;
  }
}

function determineShoe(subcategory: number) {
  switch (subcategory.toString()) {
    case Subcategory.Sneaker.toString():
      return sneakers;
    case Subcategory.Boot.toString():
      return boots;
    case Subcategory.Sandal.toString():
      return sandals;
  }
}

function determineOuterwear(subcategory: number) {
  switch (subcategory.toString()) {
    case Subcategory.Sweatshirt.toString():
      return sweatshirt;
    case Subcategory.Jacket.toString():
      return jacket;
    case Subcategory.Cardigan.toString():
      return cardigan;
  }
}

function determineAccessory(subcategory: number) {
  switch (subcategory.toString()) {
    case Subcategory.Headwear.toString():
      return hat;
    case Subcategory.Scarf.toString():
      return scarf;
    case Subcategory.Bag.toString():
      return bag;
  }
}

export function determineCategory(
  category: number,
  subcategory: number,
  material: number,
  formality: number
) {
  switch (category.toString()) {
    case Category.Top.toString():
      return determineTOP(subcategory, material, formality);
    case Category.Bottom.toString():
      return determineBottom(subcategory, material, formality);
    case Category.Shoe.toString():
      return determineShoe(subcategory);
    case Category.FullBody.toString():
      return determineFullBody(subcategory);
    case Category.Outerwear.toString():
      return determineOuterwear(subcategory);
    case Category.Accessory.toString():
      return determineAccessory(subcategory);
    default:
      console.log("Unknown or undefined category:", category);
  }
}

package edu.brown.cs.student.main.server.clothing.enums;

public enum Subcategory {
  LONG_SLEEVE(0),
  SHORT_SLEEVE(1),
  NO_SLEEVE(2),
  SKIRT(3),
  PANTS(4),
  SHORTS(5),
  SNEAKER(6),
  BOOT(7),
  SANDAL(8),
  DRESS(9),
  SUIT(10),
  ROMPER(11),
  SWEATSHIRT(12),
  JACKET(13),
  CARDIGAN(14),
  HEADWEAR(15),
  SCARF(16),
  BAG(17);

  private final int index;

  Subcategory(int id) {
    this.index = id;
  }

  public int getIndex() {
    return this.index;
  }
}

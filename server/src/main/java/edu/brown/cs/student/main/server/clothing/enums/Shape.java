package edu.brown.cs.student.main.server.clothing.enums;

public enum Shape {
  LONG_SLEEVE(0),
  SHORT_SLEEVE(1),
  NO_SLEEVE(2),
  HOODED(3),
  JACKET(4),
  DRESS(5),
  SKIRT(6),
  PANTS(7),
  SHORTS(8),
  CAP(9),
  BEANIE(10),
  SHOES(11);

  private final int index;

  Shape(int id) {
    this.index = id;
  }

  public int getIndex() {
    return this.index;
  }
}

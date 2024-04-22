package edu.brown.cs.student.main.server.clothing.enums;

public enum Material {
  WOOL_COTTON(0),
  PLASTIC_NYLON(1),
  LEATHER(2),
  DENIM(3),
  SOFT_FUR(4),
  STRETCHY_SPANDEX(5),
  NOT_APPLICABLE(6);

  private final double[][] compatibility;

  private final int index;

  Material(int id) {
    this.compatibility =
        new double[][] {
          {1.0, 0.5, 0.7, 0.8, 0.8, 0.8, 1.0},
          {0.5, 1.0, 0.5, 0.6, 0.5, 0.9, 1.0},
          {0.7, 0.5, 1.0, 0.8, 0.8, 0.6, 1.0},
          {0.8, 0.6, 0.8, 1.0, 0.7, 0.7, 1.0},
          {0.8, 0.5, 0.8, 0.7, 1.0, 0.5, 1.0},
          {0.8, 0.9, 0.6, 0.7, 0.5, 1.0, 1.0},
          {1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0}
        };
    this.index = id;
  }

  public double compatWith(Material other) {
    return this.compatibility[this.getIndex()][other.getIndex()];
  }

  private int getIndex() {
    return this.index;
  }
}

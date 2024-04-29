
export class ClothingItem {
  type: number = -1;
  category: number = -1;
  primary: number[] = [];
  secondary: number[] = [];
  material: number = -1;
  formality: number = -1;

  reset() {
    this.type = -1;
    this.category = -1;
    this.primary = [];
    this.secondary = [];
    this.material = -1;
    this.formality = -1;
  }
}

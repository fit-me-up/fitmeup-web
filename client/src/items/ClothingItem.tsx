
export class ClothingItem {
  type: number = -1;
  category: number = -1;
  primary: number[] = [];
  secondary: number[] = [];
  material: number = -1;
  formality: number = -1;

  reset() {
    this.type = undefined;
    this.shape = undefined;
    this.color = undefined;
    this.material = undefined;
    this.formality = undefined;
  }
}

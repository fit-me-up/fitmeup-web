export class ClothingItem {
  type: number | undefined = undefined;
  shape: number | undefined = undefined;
  color: number[] | undefined = undefined;
  material: number | undefined = undefined;
  formality: number | undefined = undefined;

  reset() {
    this.type = undefined;
    this.shape = undefined;
    this.color = undefined;
    this.material = undefined;
    this.formality = undefined;
  }
}

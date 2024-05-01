export class ClothingItem {
  id : number = -1;
  category: number = -1;
  subcategory : number = -1;
  primary: string = "#000000";
  secondary: string = "#000000";
  material: number = -1;
  formality: number = -1;

  reset() {
    this.id = -1;
    this.category = -1;
    this.subcategory = -1;
    this.primary = "#000000";
    this.secondary = "#000000";
    this.material = -1;
    this.formality = -1;
  }
}

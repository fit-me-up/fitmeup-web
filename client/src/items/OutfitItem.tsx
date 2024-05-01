export class OutfitItem {
  top: number = -1;
  bottom: number = -1;
  outerwear: number = -1;
  id: number = -1;
  fullbody: number = -1;
  accessory: number = -1;
  shoe: number = -1;

  reset() {
    this.top = -1;
    this.bottom = -1;
    this.outerwear = -1;
    this.id = -1;
    this.fullbody = -1;
    this.accessory = -1;
    this.shoe = -1;
  }
}
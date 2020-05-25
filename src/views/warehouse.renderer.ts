import { WarehouseListModel } from "../models/warehouse-list.model";

export class WarehouseRenderer {
  createWarehouseView(warehouses: WarehouseListModel[]) {
    let view = "";

    for (var i = 0; i < warehouses.length; i++) {
      var content = "<div><ul>";
      let warehouse = warehouses[i];
      const materialKeys = Object.keys(warehouse.materials);

      content += this.createLiElement(
        `${warehouse.name} (total ${warehouse.materialsTotal})`
      );
      materialKeys.forEach((key) => {
        const material = warehouse.materials[key];
        content += this.createLiElement(
          `${material.material.id}: ${material.quantity}`
        );
      });
      content += "</div></ul>";
      view += content;
    }

    return view;
  }

  private createLiElement(content) {
    return "<li>" + content + "</li>";
  }
}

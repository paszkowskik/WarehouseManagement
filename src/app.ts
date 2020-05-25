import { WarehouseStore, WarehouseDataProcessor } from "./app.module";
import { WarehouseService } from "./services/warehouse.service";
import { WarehouseRenderer } from "./views/warehouse.renderer";

function render() {
  let app = document.getElementById("app");
  const renderer = new WarehouseRenderer();
  const warehouses = getWarehouses();

  app.innerHTML = renderer.createWarehouseView(warehouses);
}

function getWarehouses() {
  const warehouseService = new WarehouseService();
  const warehouseStore = new WarehouseStore();
  const warehouseDataProcessor = new WarehouseDataProcessor(warehouseStore);

  const data = warehouseService.getMaterialsRawData();
  warehouseDataProcessor.fillStore(data, ";");
  return warehouseStore.getWarehouseList();
}

render();

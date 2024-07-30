import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/Implementations/DayjsDateProvider";
import { IStorageProvider } from "../StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "../StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

const diskStorage = {
  local: LocalStorageProvider
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
)

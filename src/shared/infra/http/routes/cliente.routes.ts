import { CreateClienteController } from "@modules/Menu/useCases/Cliente/createCliente/CreateClienteController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListClienteController } from "@modules/Menu/useCases/Cliente/listCliente/ListClienteController";
import { UpdateClienteController } from "@modules/Menu/useCases/Cliente/updateCliente/UpdateClienteController";
import { DeleteClienteController } from "@modules/Menu/useCases/Cliente/deleteCliente/DeleteClienteController";
import { CountClienteController } from "@modules/Menu/useCases/Cliente/countCliente/CountClienteController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const clienteRoutes = Router();

const createClienteController =  new CreateClienteController();
const listClienteController = new ListClienteController();
const updateClienteController = new UpdateClienteController();
const deleteClienteController = new DeleteClienteController();
const countClienteController = new CountClienteController();

clienteRoutes.post("/", 
    ensureAuthenticated,
    ensureAdmin,
    createClienteController.handle
);

clienteRoutes.post("/list", 
    ensureAuthenticated,
    listClienteController.handle
);

clienteRoutes.put("/:id_cliente", 
    ensureAuthenticated,
    ensureAdmin,
    updateClienteController.handle
);

clienteRoutes.delete("/:id_cliente", 
    ensureAuthenticated,
    ensureAdmin,
    deleteClienteController.handle
);

export { clienteRoutes }
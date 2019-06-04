"use strict";

import * as express from "express";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo de eventos de usuario
 */
export function initModule(app: express.Express) {
    // Rutas de acceso a eventos
    app
      .route("/v1/eventos")
      .get(onlyLoggedIn, findByCurrentUser)
      .post(onlyLoggedIn, create);

    app
      .route("/v1/evento/:petId")
      .get(onlyLoggedIn, readById)
      .post(onlyLoggedIn, updateById)
      .delete(onlyLoggedIn, removeById);
}

/**
 * @api {get} /v1/eventos Listar Eventos
 * @apiName Listar Eventos
 * @apiGroup Eventos
 *
 * @apiDescription Obtiene un listado de los eventos habilitados del usuario actual.
 *
 * @apiSuccessExample {json} Evento
 *  [
 *    {
 *      "id": "Id del evento"
 *      "titulo": "Nombre del evento",
 *      "descripcion": "Descripción del evento",
 *      "fechaEvento": date (DD/MM/YYYY),
 *      "lugarEvento": "Lugar en donde se llevará a cabo el evento"
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */

async function findByCurrentUser(req: ISessionRequest, res: express.Response) {
  const result = await service.findByCurrentUser(req.user.user_id);
  res.json(result.map((evento: any) => {
    return {
        id: evento.id,
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        fechaEvento: evento.fechaEvento,
        lugarEvento: evento.lugarEvento
      };
  }));
}

/**
 * @api {post} /v1/pet Crear Evento
 * @apiName Crear Evento
 * @apiGroup Eventos
 *
 * @apiDescription Crea un Evento.
 *
 * @apiExample {json} Evento
 *    {
 *      "id": "Id Evento"
 *    }
 *
 * @apiUse IEventoResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

async function create(req: ISessionRequest, res: express.Response) {
    const result = await service.update(undefined, req.user.user_id, req.body);
    res.json({
      id: result.id
    });
}

/**
 * @api {get} /v1/evento/:eventoId Buscar Evento
 * @apiName Buscar Evento
 * @apiGroup Eventos
 *
 * @apiDescription Busca un Evento por id.
 *
 * @apiUse IEventoResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

async function readById(req: ISessionRequest, res: express.Response) {
    const result = await service.findById(req.user.user_id, req.params.eventoId);
    res.json({
      id: result.id,
      titulo: result.titulo,
      descripcion: result.descripcion,
      fechaEvento: result.fechaEvento,
      lugarEvento: result.lugarEvento
    });
}

/**
 * @api {post} /v1/evento/:eventoId Actualizar Evento
 * @apiName Actualizar Evento
 * @apiGroup Eventos
 *
 * @apiDescription Actualiza los datos de un Evento.
 *
 * @apiExample {json} Evento
 *    {
 *      "id": "Id del evento"
 *      "titulo": "Nombre del evento",
 *      "descripcion": "Descripción del evento",
 *      "fechaEvento": date (DD/MM/YYYY),
 *      "lugarEvento": "Lugar en donde se llevará a cabo el evento"
 *    }
 *
 * @apiUse IEventoResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

async function updateById(req: ISessionRequest, res: express.Response) {
    const result = await service.update(req.params.eventoId, req.user.user_id, req.body);
    res.json({
      id: result.id,
      titulo: result.titulo,
      descripcion: result.descripcion,
      fechaEvento: result.fechaEvento,
      lugarEvento: result.lugarEvento
    });
}

/**
 * @api {delete} /v1/evento/:eventoId Eliminar Evento
 * @apiName Eliminar Evento
 * @apiGroup Eventos
 *
 * @apiDescription Eliminar un Evento.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */

async function removeById(req: ISessionRequest, res: express.Response) {
    await service.remove(req.user.user_id, req.params.eventoId);
    res.send();
}
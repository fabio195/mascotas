"use strict";

import { IEvento, Evento } from "./schema";
import * as error from "../server/error";
const mongoose = require("mongoose");

export async function findByCurrentUser(userId: string): Promise<Array<IEvento>> {
    try {
      const result = await Evento.find({
        creador: userId,
        enabled: true
      }).exec();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
}

export async function findById(userId: string, eventoId: string): Promise<IEvento> {
    try {
      const result = await Evento.findOne({
        creador: userId,
        _id: eventoId,
        enabled: true
      }).exec();
      if (!result) {
        throw error.ERROR_NOT_FOUND;
      }
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
}

async function validateUpdate(body: IEvento): Promise<IEvento> {
    const result: error.ValidationErrorMessage = {
      messages: []
    };

    if (body.titulo && body.titulo.length > 256) {
      console.log("'se valida el titulo'");
      result.messages.push({ path: "titulo", message: "Hasta 256 caracteres solamente." });
    }

    if (body.descripcion && body.descripcion.length > 1024) {
      console.log("'se valida la descripcion");
      result.messages.push({ path: "descripcion", message: "Hasta 2014 caracteres solamente." });
    }

    // if (body.fechaEvento.getDay() > Date.now() {
    //   console.log("'se valida la fecha del evento");
    //   result.messages.push({ path: "fechaEvento", message: "La fecha debe ser posterior a la actual"});
    // }

    if (result.messages.length > 0) {
      return Promise.reject(result);
    }

    return Promise.resolve(body);
}

export async function update(eventoId: string, userId: string, body: IEvento): Promise<IEvento> {
  console.log("el body enviado es: ", body);
    try {
      let current: IEvento;
      if (eventoId) {
        current = await Evento.findById(eventoId);
        if (!current) {
          throw error.ERROR_NOT_FOUND;
        }
      } else { // Si no existe, crea uno con el id del user que le manda por parametro
        current = new Evento();
        current.creador = mongoose.Types.ObjectId.createFromHexString(userId);
        console.log("evento creado: ", current);
      }

      const validBody = await validateUpdate(body);
      if (validBody.titulo) {
        current.titulo = validBody.titulo;
      }
      if (validBody.descripcion) {
        current.descripcion = validBody.descripcion;
      }
      if (validBody.fechaEvento) {
        current.fechaEvento = validBody.fechaEvento;
      }
      current.lugarEvento = body.lugarEvento;

      await current.save();
      return Promise.resolve(current);
    } catch (err) {
      return Promise.reject(err);
    }
}

export async function remove(userId: string, eventoId: string): Promise<void> {
    try {
      const evento = await Evento.findOne({
        creador: userId,
        _id: eventoId,
        enabled: true
      }).exec();
      if (!evento) {
        throw error.ERROR_NOT_FOUND;
      }
      evento.enabled = false;
      await evento.save();
    } catch (err) {
      return Promise.reject(err);
    }
}

async function validateUpdateEventPicture(imageId: string): Promise<void> {
  const result: error.ValidationErrorMessage = {
    messages: []
  };

  if (!imageId || imageId.length <= 0) {
    result.messages.push({ path: "image", message: "Imagen inválida." });
  }

  if (result.messages.length > 0) {
    return Promise.reject(result);
  }

  return Promise.resolve();
}

export async function updateEventPicture(userId: string, eventoId: string, imageId: string): Promise<IEvento> {
  console.log("updateEventPicture: ", userId, eventoId, imageId);
  try {
    let evento = await findById(userId, eventoId);
    await validateUpdateEventPicture(imageId);

    if (!evento) {
      evento = new Evento();
      evento.id = mongoose.Types.ObjectId.createFromHexString(eventoId);
      evento.creador = mongoose.Types.ObjectId.createFromHexString(eventoId);
      console.log("no se encontro el evento");
    }

    console.log("imagenid del evento:", imageId);

    evento.picture = imageId;

    await evento.save();
    return Promise.resolve(evento);
  } catch (err) {
    return Promise.reject(err);
  }
}
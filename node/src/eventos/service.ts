"use strict";

import { IEvento, Evento } from "./schema";
import * as error from "../server/error";
const mongoose = require("mongoose");

export async function findByCurrentUser(userId: string): Promise<Array<IEvento>> {
    try {
      const result = await Evento.find({
        user: userId,
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
        user: userId,
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
      result.messages.push({ path: "titulo", message: "Hasta 256 caracteres solamente." });
    }

    if (body.descripcion && body.descripcion.length > 1024) {
      result.messages.push({ path: "descripcion", message: "Hasta 2014 caracteres solamente." });
    }

    if (body.fechaEvento.getDate() > Date.now()) {
      result.messages.push({ path: "fechaEvento", message: "La fecha debe ser posterior a la actual"});
    }

    if (result.messages.length > 0) {
      return Promise.reject(result);
    }

    return Promise.resolve(body);
}

export async function update(eventoId: string, userId: string, body: IEvento): Promise<IEvento> {
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

      await current.save();
      return Promise.resolve(current);
    } catch (err) {
      return Promise.reject(err);
    }
}

export async function remove(userId: string, eventoId: string): Promise<void> {
    try {
      const evento = await Evento.findOne({
        user: userId,
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
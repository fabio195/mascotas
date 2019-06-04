"use strict";

import * as mongoose from "mongoose";

export interface IEvento extends mongoose.Document {
    titulo: String;
    descripcion: String;
    fechaCreacion: Number;
    fechaEvento: Date;
    lugarEvento: String;
    creador: mongoose.Schema.Types.ObjectId;
    enabled: Boolean;
}

/**
 * Esquema de Evento
 */

export let schemaEvento = new mongoose.Schema({
    titulo: {
        type: String,
        default: "",
        trim: true,
        required: "El título es requerido"
    },
    descripcion: {
        type: String,
        default: "",
        trim: true,
        required: "Añada una descripción al evento"
    },
    fechaCreacion: {
        type: Number,
        default: "",
        trim: true,
    },
    fechaEvento: {
        type: Date,
        default: "",
        trim: true,
        required: "La fecha del evento es requerida"
    },
    lugarEvento: {
        type: String,
        default: "",
        trim: true,
        required: "El lugar del evento es requerido"
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        referencia: "creador",
        trim: true,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
}, {collection: "eventos" });

/**
 * Antes de guardar
 */
schemaEvento.pre("save", function (this: IEvento, next) {
    this.fechaCreacion = Date.now();
    next();
  });

export let Evento = mongoose.model<IEvento>("Evento", schemaEvento);
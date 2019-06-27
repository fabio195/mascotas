import axios, { AxiosError } from "axios";
import { logout } from "../store/sessionStore";

axios.defaults.headers.common["Content-Type"] = "application/json";

export interface IEvento {
    id: string;
    titulo: string;
    descripcion: string;
    fechaCreacion?: Date;
    fechaEvento: string;
    lugarEvento: string;
    creador?: string;
    picture?: string;
}

export interface IUpdateEventoImage {
    image: string;
}
export interface IUpdateEventoImageId {
    id: string;
}

export async function loadEventos(): Promise<IEvento[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/evento");
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function loadEvento(id: string): Promise<IEvento> {
    try {
        const res = await axios.get("http://localhost:3000/v1/evento/" + id);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function newEvento(payload: IEvento): Promise<IEvento> {
    try {
        const res = await axios.post("http://localhost:3000/v1/evento", payload);
        return Promise.resolve(res.data as IEvento);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function updateEvento(payload: IEvento): Promise<IEvento> {
    try {
        const res = await axios.post("http://localhost:3000/v1/evento/" + payload.id, payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function deleteEvento(id: string): Promise<void> {
    try {
        await axios.delete("http://localhost:3000/v1/evento/" + id);
        return Promise.resolve();
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function getPictureEvento(id: string) {
    const response = await axios.get("http://localhost:3000/v1/evento/" + id + "/picture");
    const picture = response.data.picture;
    return picture;
}

export function getPictureUrl(id: string | undefined) {
    if (id && id.length > 0) {
        return "http://localhost:3000/v1/image/" + id;
    } else {
        return "/assets/pets.jpg";
    }
}

export async function updateEventoPicture(payload: IUpdateEventoImage,
                                          idEvento: string): Promise<IUpdateEventoImageId> {
    try {
        const res = await axios.post("http://localhost:3000/v1/evento/" + idEvento + "/picture", payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

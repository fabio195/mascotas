import axios, { AxiosError } from "axios";
import { logout } from "../store/sessionStore";

axios.defaults.headers.common["Content-Type"] = "application/json";

export interface IPet {
    id: string;
    name: string;
    birthDate: string;
    description: string;
}

export async function loadPets(): Promise<IPet[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/pet");
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function loadPet(id: string): Promise<IPet> {
    try {
        const res = await axios.get("http://localhost:3000/v1/pet/" + id);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function newPet(payload: IPet): Promise<IPet> {
    try {
        const res = await axios.post("http://localhost:3000/v1/pet", payload);
        return Promise.resolve(res.data as IPet);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function savePet(payload: IPet): Promise<IPet> {
    try {
        const res = await axios.post("http://localhost:3000/v1/pet/" + payload.id, payload);
        return Promise.resolve(res.data);
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

export async function deletePet(id: string): Promise<void> {
    try {
        await axios.delete("http://localhost:3000/v1/pet/" + id);
        return Promise.resolve();
    } catch (err) {
        if ((err as AxiosError) && err.response && err.response.status === 401) {
            logout();
        }
        return Promise.reject(err);
    }
}

import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

export interface IProvince {
    id: string;
    name: string;
}

export async function getProvinces(): Promise<IProvince[]> {
    try {
        const res = await axios.get("http://localhost:3000/v1/province");
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

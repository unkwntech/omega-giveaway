import { Identifiable } from "./identifiable";

export default class Prize implements Identifiable {
    public id: string;

    public code: string;
    public typeID: number;
    public name: string;
    public qty: number;

    public constructor(json: any) {
        if (json.id === undefined) throw new Error("id is required for Prize");
        else this.id = json.id;

        if (json.code === undefined)
            throw new Error("code is required for Prize");
        else this.code = json.code;

        if (json.typeID === undefined)
            throw new Error("typeID is required for Prize");
        else this.typeID = json.typeID;

        if (json.name === undefined)
            throw new Error("name is required for Prize");
        else this.name = json.name;

        if (json.qty === undefined)
            throw new Error("qty is required for Prize");
        else this.qty = json.qty;
    }
}

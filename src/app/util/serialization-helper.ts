export class SerializationHelper {
    static toInstance<T>(obj: T, json: any) : T {
        if (obj === undefined) {
            return json;
        }
        
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](json);
        }
        else {
            for (var propName in json) {
                obj[propName] = json[propName]
            }
        }

        return obj;
    }

    static toJson<T>(obj: T, json: any): any {
        if (obj === undefined) {
            return json;
        }
        if (typeof obj["toJSON"] === "function") {
            obj["toJSON"](json);
        }
        else {
            for(var prop in obj) {
                json[prop] = obj[prop];
            }
        }
        return json;
    }
}
/**
 * Convert object to json of given fields
 * If the key given is a function it will be ran without any arguments
 * @param instance can be any object in the universe
 * @param fields can beither a string or an array of 2 elements, where 1st represents the field and second one the desired key
 */
export default function serialize(instance: any, fields: string[] | any[]) {
    let data = {};

    fields.forEach((field) => {
        let value: any;
        let target: string;

        if (typeof field === 'string') {
            value = instance[field as string];
        } else {
            target = field[1];
            field = field[0];
            value = instance[field];
        }

        if (value instanceof Function) {
            value = value();
        }

        if (!value) return;

        if (value) {
            data[target ? target : (field as string)] = value;
        }
    });

    return data;
}

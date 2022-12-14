export default class ObjectHelper {
    static deleteEmptyProperties = (obj) => {
        return Object.entries(obj)
          .filter(([_, v]) => v != null)
          .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    };
}
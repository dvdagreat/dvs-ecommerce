export default class ProductService {
    static mapRequestToDatabaseFields({name, price, quantity}) {
        return {name, price, quantity}
    }
}
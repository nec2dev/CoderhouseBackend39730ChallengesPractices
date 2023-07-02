import config from '../../config/config.js';
import UsersMongo from './usersDAOs/user.mongo.js';
import CartsMongo from './cartsDAOs/cart.mongo.js';
import ProductsMongo from './productsDAOs/product.mongo.js';

let DAO = {
    users: null,
    carts: null,
    products: null
};

switch (config.PERSISTENCE) {
    case 'MONGO':
        await import('../mongo/config.mongo.js');
        DAO.users = new UsersMongo();
        DAO.carts = new CartsMongo();
        DAO.products = new ProductsMongo();
        break;
    default:
        await import('../mongo/config.mongo.js');
        DAO.users = new UsersMongo();
        DAO.carts = new CartsMongo();
        DAO.products = new ProductsMongo();
        break;
}

export default DAO;
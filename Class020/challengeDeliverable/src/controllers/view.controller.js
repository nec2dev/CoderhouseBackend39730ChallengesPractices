import DAO from "../persistence/DAOs/factory.js";

const userManager = DAO.users;
const messagesManager = DAO.messages;
const productManager = DAO.products;
const cartManager = DAO.carts;

class ViewController {
    getProducts = async (req, res) => {
        try {
            const results = await productManager.getProducts(req.query);
            const products = (results.payload).map(product => {
                return {
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                    category: product.category,
                    status: product.status
                }
            });
            res.render('home', { products })
        } catch (error) {
            console.log(error);
        } 
    }
    
    getRealTimeProducts = (req, res) => { 
        try {
            res.render('realTimeProducts')
        } catch (error) {
            console.log(error);
        }
    }

    getProductsForUser = async (req, res) => {
        try {
            const results = await productManager.getProducts(req.query);
            const user = { email: req.user.email, name: req.user.firstName, role: req.user.admin ? 'admin' : 'user' };
            if (results.prevLink) {
                results.prevLink = (results.prevLink).replace('api', 'views')
            }
            if (results.nextLink) {
                results.nextLink = (results.nextLink).replace('api', 'views')
            }
            const products = (results.payload).map(product => {
                return {
                    id: product._id.toString(),
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock,
                    category: product.category,
                    status: product.status
                }
            });
            res.render('products', { products, results, user })
        } catch (error) {
            console.log(error);
        }
    }

    getCart = async (req, res) => {
        try {
            const { cartId } = req.params;
            const cart = await cartManager.getProductsFromCart(cartId);
            const products = (cart[0].products).map(product => {
                return {
                    id: product._id._id.toString(),
                    title: product._id.title,
                    price: product._id.price,
                    thumbnail: product._id.thumbnail,
                    code: product._id.code,
                    quantity: product.quantity,
                    sum: product.quantity * product._id.price
                }
            });
            const sumCart = products.reduce((accumulator, currentValue) => accumulator + currentValue.sum, 0);
            res.render('cart',{ products, cartId, sumCart })
        } catch (error) {
            console.log(error);
        }
    }

    renderLogin = (req, res) => { 
        try {
            res.render('login')
        } catch (error) {
            console.log(error);
        }
    }

    renderRegister = (req, res) => { 
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
        }
    }

    renderErrorRegister = (req, res) => { 
        try {
            res.render('errorRegister')
        } catch (error) {
            console.log(error);
        }
    }

    renderErrorLogin = (req, res) => { 
        try {
            res.render('errorLogin')
        } catch (error) {
            console.log(error);
        }
    }
    
  renderUsers = async (req, res) => {
    let users = await userManager.getUsers();
    console.log(users);
    res.render("users", { users });
  };

  renderProducts = async (req, res) => {
    const isLogin = req.session.user ? true : false;
    const user = req.session.user;
    const { page = 1, limit = 5, sort, category = "" } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
      await productModel.paginate(
        { category: { $regex: category } },
        { sort: { price: sort }, limit, page, lean: true }
      );
    const products = docs;
    res.render("products", {
      isLogin,
      user,
      products,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      page,
    });
  };

  renderCart = async (req, res) => {
    let cid = req.params.cid;
    let cart = await cartModel
      .findById(cid)
      .populate("products.product")
      .lean();
    let cartProducts = cart.products;
    console.log(cartProducts);
    res.render("carts", { cart, cartProducts });
  };

  renderMessages = async (req, res) => {
    let messages = await messagesManager.getMessages();
    console.log(messages);
    res.render("chat", { messages });
  };

  renderRegister = (req, res) => {
    res.render("register");
  };

  renderLogin = (req, res) => {
    res.render("login");
  };

  logout = async (req, res) => {
    req.session.destroy();
    res.send("logout success!");
  };
}

export default new ViewController();

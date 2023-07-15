import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

cartSchema.pre('find', function (next) {
    this.populate({ path:'products._id' });
    next()
});

export const cartModel = mongoose.model('Carts', cartSchema);
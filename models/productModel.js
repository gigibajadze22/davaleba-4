import mongoose from 'mongoose';
import stockHistory from './stockHistoryModel.js';

const productsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: [true, "Name is Required"] },
    price: { type: Number, required: true, validate: { validator: (val) => val > 0, message: "price must be greater than 0" } },
    stock: { type: Number, required: true },
    category:{type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    archived: {type:Boolean, default: false}
},
{
     
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

productsSchema.pre("findOneAndDelete", async function(next) {
    console.log(this.getQuery());
    const product = await this.model.findOne(this.getQuery())
    console.log(product);
        

if(product.stock > 0){
       return next(new Error("Product can't be deleted because it has stock"));
        
    }
    next()
})


productsSchema.post('save', function(doc) {
    console.log("product Saved", doc);
})

productsSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate()
    if(!update.stock) return next()
        const product = await this.model.findOne(this.getQuery())
    
    if(update.stock === product.stock) return next()
        await stockHistory.create({
         productId: product._id,
         previousStock: product.stock,
         newStock: update.stock,   
        })
})


productsSchema.virtual('status').get(function() {
    return this.stock >0 ? "Available" :  "Not Available"
}) 
productsSchema.virtual('priceWithTax').get(function(){
    return this.price * 1.2
})

productsSchema.virtual('capacity').get(function(){
    return (this.price * this.stock)
}) 


productsSchema.statics.archived = async function(filter) {
    return this.updateOne(filter, {archived: true})
}


const Product = mongoose.model("Product", productsSchema);


export default Product
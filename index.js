const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const product = require('mongodb').ObjectId;


const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u15fw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run (){
    try{
        await client.connect();
        const database = client.db('assignment12');
        const productCollection = database.collection('products');
        const reviewCollection = database.collection('reviews');
        const orderCollection = database.collection('orders');



        // get product
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products)
        })
            

        // add a product

        app.post('/products', async(req, res)=>{
            const products = req.body;
            const result = await productCollection.insertOne(products);
            res.json(result)
        })

        // delete products 

        app.delete('/products/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: product(id)};
            const result = await productCollection.deleteOne(query)
            
            res.json(result)
        })

        // review post and get

        app.post('/reviews', async(req, res)=>{
            const reviews = req.body;
            const result = await reviewCollection.insertOne(reviews);
            res.json(result)
        })

        app.get('/reviews', async (req, res) => {
            const cursor = reviewCollection.find({});
            const  reviews= await cursor.toArray();
            res.send(reviews)
        })

        // orders post and get
        // post orders
        app.post('/orders', async(req, res)=>{
            const orders = req.body;
            const result = await orderCollection.insertOne(orders);
            res.json(result)
        })
        // get orders
        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find({});
            const  orders= await cursor.toArray();
            res.send(orders)
        })


        // delete orders

        app.delete('/orders/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await orderCollection.deleteOne(query)
            
            res.json(result)
        })
        // delete all orders

        // app.delete('/manageAllOrders/:id', async (req, res) =>{
        //     const id = req.params.id;
        //     const query = {_id:ObjectId(id)};
        //     const result = await orderCollection.deleteOne(query)
            
        //     res.json(result)
        // })


    }
    finally{
    //    await client.close()
    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello assignment 12')
})

app.listen(port, () => {
  console.log(`listening at port`, port)
})
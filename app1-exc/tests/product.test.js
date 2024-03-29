const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const helper = require('../helpers/product.helper')

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(
      () => { console.log("Connection to MOngoDB established")},
      err => { console.log("Failed to connect to MongoDB", err)}
    )
});

afterEach(async ()=>{
  await mongoose.connection.close();
})

//get
describe("Request GET /api/products", () => {
  it("Returns all products", async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0)
  }, 10000)

  it('Returns a product', async ()=>{
    
    const result = await helper.findLastInsertedProduct();    
    
    const res = await request(app).get('/api/products/' + result.product);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.product).toBe(result.product);
    expect(res.body.data.quantity).toBe(result.quantity);
  }, 10000)
});

//post
describe('Request POST /api/products', () => {
  it('Creates a product', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "productTest-1",
      cost: 111.11,
      description:"product Jest Test 1",
      quantity: 111
    })
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
  }, 10000);

  it('Create a product testing required product description', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "productTest-2",
      cost: 111.11,
      description:"",
      quantity: 111
    })
    expect(res.statusCode).toBe(400);
    expect(res.body.data.description).not.toBe(null);
  }, 10000);

  it('Create a product testing required product quantity', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "productTest-2",
      cost: 111.11,
      description:"product Jest Test 2",
      quantity: 0
    })
    expect(res.statusCode).toBe(400);
    expect(res.body.data.quantity).toBeGreaterThan(0);
  }, 10000);

  it('Create a product testing required product cost', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "productTest-2",
      cost: -111.11,
      description:"product Jest Test 2",
      quantity: 111
    })
    expect(res.statusCode).toBe(400);
    expect(res.body.data.cost).toBeGreaterThan(0);
  }, 10000);
});

//update
describe("UPDATE /api/products/:product", () => {
  it("Delete last inserted product", async () =>{
    const result = await helper.findLastInsertedProduct();
    const res = await request(app)
      .patch('/api/products/' + result.product)
      .send({
        product: result.product,
        cost: result.cost + 1,
        description: result.description + " UPD",
        quantity: result.quantity + 10
      })    
    expect(res.statusCode).toBe(200)
  },10000)
})

//delete
describe("DELETE /api/products/:product", () => {
  it("Delete last inserted product", async () =>{
    const result = await helper.findLastInsertedProduct();
    const res = await request(app)
      .delete('/api/products/' + result.product);    
    expect(res.statusCode).toBe(200)
  },10000)
})
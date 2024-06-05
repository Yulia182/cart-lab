import express from "express";
import { cartItems } from "../db";
import CartItem from "../models/CartItem";

const cartItemsRouter = express.Router();

// 1. GET /cart-items
cartItemsRouter.get("/cart-items", (req, res) => {
  let newCart: CartItem[] = cartItems;
  const maxPrice: number = +(req.query.maxPrice as string);
  const prefix: string = req.query.prefix as string;
  const pageSize: number = +(req.query.pageSize as string);
  if (maxPrice) {
    newCart = cartItems.filter((item) => item.price < maxPrice);
  }
  if (prefix) {
    newCart = cartItems.filter((item) => item.product[0] === prefix);
  }
  if (pageSize) {
    newCart = cartItems; // tried reseting
    newCart.length = pageSize;
  }
  // response
  res.status(200).json(newCart);
});

// 2. GET /cart-items/:id
cartItemsRouter.get("/cart-items/:id", (req, res) => {
  // request
  const id: number = +req.params.id;
  const foundItem: CartItem | undefined = cartItems.find(
    (obj) => obj.id === id
  );
  // response
  if (foundItem) {
    res.status(200).json(foundItem);
  } else {
    res.status(404).json({ message: `ID Not Found` });
  }
});

// 3. POST /cart-items
cartItemsRouter.post("/cart-items", (req, res) => {
  // request
  const newItem: CartItem = req.body;
  newItem.id = Math.floor(Math.random() * 100);
  cartItems.push(newItem);
  //response
  res.status(201).json(newItem);
});

// 4. PUT /cart-items/:id
cartItemsRouter.put("/cart-items/:id", (req, res) => {
  // request
  const idToReplace: number = +req.params.id;
  const updatedItem: CartItem = req.body;

  const index: number = cartItems.findIndex((item) => item.id === idToReplace);
  cartItems[index] = updatedItem;
  // response
  res.status(200).json(updatedItem);
});

cartItemsRouter.patch("/cart-items/:id", (req, res) => {
  // request
  const idToReplace: number = +req.params.id;
  const newQuantity: number = req.body.quantity;

  const index: number = cartItems.findIndex((item) => item.id === idToReplace);
  cartItems[index].quantity = newQuantity;
  // response
  if (index !== -1) {
    res.status(200).json(newQuantity);
  } else {
    res.status(404); // 404 - not found
    res.json({ message: `Cannot find a continent with ID: ${index}` });
  }
});

// 5. DELETE /cart-items/:id
cartItemsRouter.delete("/cart-items/:id", (req, res) => {
  // request
  const idToDelete: number = +req.params.id;
  const index: number = cartItems.findIndex((item) => item.id === idToDelete);
  // response
  if (index !== -1) {
    cartItems.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404); // 404 - not found
    res.json({ message: `Cannot find a continent with ID: ${index}` });
  }
});

export default cartItemsRouter;

"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartOrder, setCartOrder] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCartToState();
    setCartOrderToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const setCartOrderToState = () => {
    setCartOrder(
      localStorage.getItem("cartorder")
        ? JSON.parse(localStorage.getItem("cartorder"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
    discount,
    description,
    category,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
      discount,
      description,
      category,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const saveOnCheckout = ({
    amount,
    discount,
    totalAmount,
    deliveryCharges,
    shippinginfo,
  }) => {
    const checkoutInfo = {
      amount,
      discount,
      totalAmount,
      deliveryCharges,
      shippinginfo,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartToState();
  };

  const addCartToCartOrder = () => {
    localStorage.setItem("cartorder", JSON.stringify(cart));
    setCartOrderToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOrder,
        addItemToCart,
        saveOnCheckout,
        deleteItemFromCart,
        clearCart,
        addCartToCartOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

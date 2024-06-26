"use client";

import React, { useContext } from "react";
import CartContext from "@/context/CartContext";
import Link from "next/link";

const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart, saveOnCheckout, clearCart } =
    useContext(CartContext);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    addItemToCart(item);
  };

  const amountWithoutDiscount = cart?.cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const discountAmount = cart?.cartItems?.reduce(
    (acc, item) => acc + (item.quantity * item.price * item.discount) / 100,
    0
  );

  const totalAmount = Number(amountWithoutDiscount) - Number(discountAmount);

  const deleteCart = () => {
    clearCart();
  };

  const checkoutHandler = () => {
    const data = {
      amount: amountWithoutDiscount,
      discount: discountAmount,
      totalAmount,
      deliveryCharges: 0,
      shippinginfo: "",
    };

    saveOnCheckout(data);
  };

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Sản phẩm trong giỏ hàng
          </h2>
        </div>
      </section>

      {cart?.cartItems?.length > 0 ? (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem) => (
                    <div>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <img src={cartItem.image} alt={cartItem.name} />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href="#" className="hover:text-blue-600">
                                  {cartItem.name}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                {" "}
                                Hãng: {cartItem.seller}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            {Number(cartItem?.discount) !== 0 ? (
                              <>
                                <p className="font-semibold not-italic text-[#666] line-through">
                                  {
                                    +(
                                      cartItem.price * cartItem.quantity
                                    ).toLocaleString()
                                  }
                                  .000VND
                                </p>
                                <p className="font-semibold not-italic">
                                  {
                                    +(
                                      cartItem.price * cartItem.quantity -
                                      (cartItem?.price *
                                        cartItem?.discount *
                                        cartItem?.quantity) /
                                        100
                                    ).toLocaleString()
                                  }
                                  .000VND
                                </p>
                                <small className="text-gray-400">
                                  {" "}
                                  {(+(
                                    cartItem.price -
                                    (cartItem?.price * cartItem?.discount) / 100
                                  ).toFixed(0)).toLocaleString()}
                                  .000 VNĐ / mỗi sản phẩm{" "}
                                </small>
                              </>
                            ) : (
                              <p className="font-semibold not-italic">
                                {
                                  +(
                                    cartItem.price * cartItem.quantity
                                  ).toLocaleString()
                                }
                                .000VND
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                deleteItemFromCart(cartItem?.product)
                              }
                            >
                              Xóa
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                  <div className="flex justify-end mt-4">
                    <a
                      className="px-4 py-3 mb-2 inline-block text-lg text-center font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 cursor-pointer"
                      onClick={deleteCart}
                    >
                      Xoá tất cả sản phẩm
                    </a>
                  </div>
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Tổng giá tiền:</span>
                      <span>
                        {(+amountWithoutDiscount).toLocaleString()}.000 VNĐ
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Số sản phẩm:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )}{" "}
                        (sản phẩm)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Giảm giá:</span>
                      <span className="text-red-500">
                        {(+discountAmount.toFixed(0)).toLocaleString()}
                        .000 VNĐ
                      </span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Tổng tiền:</span>
                      <span>
                        {(+totalAmount.toFixed(0)).toLocaleString()}.000 VNĐ
                      </span>
                    </li>
                  </ul>

                  <a
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    Tiếp tục
                  </a>

                  <Link
                    href="/product"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Trở về
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <div className="py-20"></div>
      )}
    </>
  );
};

export default Cart;

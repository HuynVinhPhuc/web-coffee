"use client";

import OrderContext from "@/context/OrderContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateOrder = ({ order }) => {
  const { updateOrder, error, clearErrors, updated, setUpdated } =
    useContext(OrderContext);

  const [orderStatus, setOrderStatus] = useState(order?.orderStatus);

  useEffect(() => {
    if (updated) {
      setUpdated(false);
      toast.success("Đơn hàng cập nhật thành công !!!");
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated]);

  const submitHandler = () => {
    const orderData = { orderStatus };

    updateOrder(order?._id, orderData);
  };

  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            ID đơn hàng:
            <span className="text-[#666] font-normal"> {order?._id} </span>
            {order?.orderStatus == "Đang xử lý" ? (
              <span className="text-red-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">{order?.createAt?.substring(0, 10)} </p>
        </div>
        <p className="font-semibold ">
          Phương thức thanh toán:{" "}
          <span className="font-normal text-[#666]">
            {order?.paymentInfo === "Thanh toán khi nhận hàng" ? (
              <span className="text-yellow-500">
                {order?.paymentInfo.toUpperCase()}
              </span>
            ) : order?.paymentInfo === "Thanh toán không thành công" ? (
              <span className="text-red-500">
                {order?.paymentInfo.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                {order?.paymentInfo.toUpperCase()}
              </span>
            )}
            .
          </span>
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Người nhận</p>
          <ul className="text-gray-600">
            <li>{order?.user?.name}</li>
            <li>Số điện thoại: {order?.shippingInfo?.phoneNo}</li>
            <li>Địa chỉ email: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Địa chỉ giao hàng</p>
          <ul className="text-gray-600">
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.district},{" "}
              {order?.shippingInfo?.ward}
            </li>
            <li>{order?.shippingInfo?.street}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Thanh toán</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>
              Phí vận chuyển: {(+order?.deliveryCharges).toLocaleString()}.000
              VNĐ
            </li>
            <li>Tổng tiền: {(+order?.totalAmount).toLocaleString()}.000 VNĐ</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4">
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item?.image}
                  height="60"
                  width="60"
                  alt={item.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item.quantity}x ={" "}
                {
                  +(
                    (item.price - item.price * (item.discount / 100)) *
                    item.quantity
                  )
                    .toFixed(0)
                    .toLocaleString()
                }
                .000 VNĐ
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <hr />

      <div class="my-8">
        <label class="block mb-3"> Cập nhật trạng thái đơn hàng </label>
        <div class="relative">
          <select
            class="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="category"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          >
            {["Đang xử lý", "Đang giao hàng", "Đã giao hàng"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <i class="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg
              width="22"
              height="22"
              class="fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
      </div>

      <button
        type="submit"
        className="mb-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        onClick={() => submitHandler()}
      >
        Cập nhật
      </button>
    </article>
  );
};

export default UpdateOrder;

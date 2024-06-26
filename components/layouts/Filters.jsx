"use client";

import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/navigation";
import { getPriceQueryParams } from "@/helpers/helpers";

const Filters = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [filterResponesive, setFilterResponsive] = useState(false);

  const toggleFilterResponsive = () => {
    setFilterResponsive(!filterResponesive);
  };

  const router = useRouter();

  let queryParams;

  function handleClick(checkbox) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      queryParams.delete(checkbox.name);
    } else {
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
    }

    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
  }

  function handleButtonClick() {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      queryParams = getPriceQueryParams(queryParams, "min", min);
      queryParams = getPriceQueryParams(queryParams, "max", max);

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <button
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
        onClick={toggleFilterResponsive}
      >
        <i className="fa fa-filter pr-2" />
        Lọc
      </button>
      {filterResponesive && (
        <div className="lg:hidden">
          <div className="md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
            <h3 className="font-semibold mb-2">Giá (nghìn VNĐ)</h3>
            <div className="grid md:grid-cols-3 gap-x-2">
              <div className="mb-4">
                <input
                  name="min"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="number"
                  placeholder="Min"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  name="max"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="number"
                  placeholder="Max"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <button
                  className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  onClick={handleButtonClick}
                >
                  <i className="fa fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
            <ul className="space-y-1">
              <li>
                <label className="flex items-center">
                  <input
                    name="discount"
                    type="checkbox"
                    value="0"
                    className="h-4 w-4"
                    defaultChecked={checkHandler("discount", "0")}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="font-bold ml-2 text-red-500">
                    {" "}
                    Sản phẩm đang giảm giá{" "}
                  </span>
                </label>
              </li>
            </ul>
          </div>

          <div className="md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
            <h3 className="font-semibold mb-2">Loại cà phê</h3>

            <ul className="space-y-1">
              <li>
                <label className="flex items-center">
                  <input
                    name="category"
                    type="checkbox"
                    value="Nguyên hạt"
                    className="h-4 w-4"
                    defaultChecked={checkHandler("category", "Nguyên hạt")}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="ml-2 text-gray-500"> Nguyên hạt </span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    name="category"
                    type="checkbox"
                    value="Xay hạt lớn"
                    className="h-4 w-4"
                    defaultChecked={checkHandler("category", "Xay hạt lớn")}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="ml-2 text-gray-500"> Xay hạt lớn </span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    name="category"
                    type="checkbox"
                    value="Xay hạt vừa"
                    className="h-4 w-4"
                    defaultChecked={checkHandler("category", "Xay hạt vừa")}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="ml-2 text-gray-500"> Xay hạt vừa </span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    name="category"
                    type="checkbox"
                    value="Xay hạt nhỏ"
                    className="h-4 w-4"
                    defaultChecked={checkHandler("category", "Xay hạt nhỏ")}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="ml-2 text-gray-500"> Xay hạt nhỏ </span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    name="category"
                    type="checkbox"
                    value="Bột cà phê"
                    className="h-4 w-4"
                    defaultChecked={checkHandler("category", "Bột cà phê")}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="ml-2 text-gray-500"> Bột cà phê </span>
                </label>
              </li>
            </ul>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2">Đánh giá</h3>
            <ul className="space-y-1">
              <li>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      name="ratings"
                      type="checkbox"
                      value={rating}
                      className="h-4 w-4"
                      defaultChecked={checkHandler("ratings", `${rating}`)}
                      onClick={(e) => handleClick(e.target)}
                    />
                    <span className="ml-2 text-gray-500">
                      {" "}
                      <StarRatings
                        rating={rating}
                        starRatedColor="#ffb829"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                        name="rating"
                      />{" "}
                    </span>
                  </label>
                ))}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <p className="font-semibold mb-5 text-2xl text-center">
          <i className="fa fa-filter pr-2" />
          Lọc
        </p>
        <h3 className="font-semibold mb-2">Giá (nghìn VNĐ)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button
              className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              onClick={handleButtonClick}
            >
              <i className="fa fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="discount"
                type="checkbox"
                value="0"
                className="h-4 w-4"
                defaultChecked={checkHandler("discount", "0")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="font-bold ml-2 text-red-500">
                Sản phẩm đang giảm giá{" "}
              </span>
            </label>
          </li>
        </ul>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Loại cà phê</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Nguyên hạt"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Nguyên hạt")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Nguyên hạt </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Xay hạt lớn"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Xay hạt lớn")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Xay hạt lớn </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Xay hạt vừa"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Xay hạt vừa")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Xay hạt vừa </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Xay hạt nhỏ"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Xay hạt nhỏ")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Xay hạt nhỏ </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Bột cà phê"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Bột cà phê")}
                onClick={(e) => handleClick(e.target)}
              />
              <span className="ml-2 text-gray-500"> Bột cà phê </span>
            </label>
          </li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Đánh giá</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  defaultChecked={checkHandler("ratings", `${rating}`)}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500">
                  {" "}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />{" "}
                </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;

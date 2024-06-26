import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import BreadCrumbs from "@/components/layouts/BreadCrumbs";

import queryString from "query-string";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "discount[gt]": searchParams.discount,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  return data;
};

const ProductsPage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  const breadCrumbs = [
    { name: "Trang Chủ", url: "/" },
    { name: "Sản Phẩm", url: "/product" },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <ListProducts data={productsData} />
    </>
  );
};

export default ProductsPage;

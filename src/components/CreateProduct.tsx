import React, { useState } from "react";
import { IProduct } from "../models";
import axios from "axios";
import { ErrorMassage } from "./ErrorMassage";

const productData: IProduct = {
  title: "",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronic",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

interface CreateProducrProps {
  onCreate: (product: IProduct) => void;
}

export function CreareProduct({ onCreate }: CreateProducrProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (value.trim().length === 0) {
      setError("Please enter valid title");
      return;
    }
    productData.title = value;
    // productData.id = Math.floor(Math.random() * 100000);

    const response = await axios.post<IProduct>(
      "https://fakestoreapi.com/products",
      productData
    );
    onCreate(response.data);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title.."
        value={value}
        onChange={changeHandler}
      />

      <ErrorMassage error={error} />
      <button
        type="submit"
        className="py-2 px-4 borde bg-yellow-400 hover:bg-yellow-600 hover:text-white"
      >
        Create
      </button>
    </form>
  );
}

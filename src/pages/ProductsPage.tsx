import { useState, useContext } from "react";
import { CreareProduct } from "../components/CreateProduct";
import { ErrorMassage } from "../components/ErrorMassage";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { Product } from "../components/Product";
import { useProducts } from "../hooks/products";
import { IProduct } from "../models";
import { ModalContext } from "../context/ModalContext";

export function ProductPage() {
  const { loading, error, products, addProduct } = useProducts();
  const {
    modal,
    open: openModal,
    close: closeModal,
  } = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    closeModal();
    addProduct(product);
  };

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMassage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}

      {modal && (
        <Modal title="Create element" onClose={() => closeModal()}>
          <CreareProduct onCreate={createHandler} />
        </Modal>
      )}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 pt-1 pb-2"
        onClick={() => openModal()}
      >
        +
      </button>
    </div>
  );
}

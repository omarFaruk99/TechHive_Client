import useProduct from "../hooks/useProduct";

const Products = () => {
  const [product, refetch] = useProduct();
  return (
    <div>
      <h2>This is products page</h2>
    </div>
  );
};

export default Products;

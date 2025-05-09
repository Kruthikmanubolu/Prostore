import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const LatestProducts = await getLatestProducts();

  // Map the data to match the expected format
  const mappedProducts = LatestProducts.map((product) => ({
    ...product,
    Category: product.category,
    Brand: product.brand,
    Description: product.description,
    
  }));

  return (
    <>
      <ProductList data={mappedProducts} title="Newest Arrivals" />
    </>
  );
};

export default HomePage;
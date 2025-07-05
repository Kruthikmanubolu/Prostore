import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { getFeaturedProducts } from "@/lib/actions/product.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";

const HomePage = async () => {
  const LatestProducts = await getLatestProducts();
  const FeaturedProducts = await getFeaturedProducts();
  // Map the data to match the expected format
  const mappedProducts = LatestProducts.map((product) => ({
    ...product,
    Category: product.category,
    Brand: product.brand,
    Description: product.description,
    
  }));

  return (
    <>
    {FeaturedProducts.length > 0 && <ProductCarousel data={FeaturedProducts} />}
      <ProductList data={mappedProducts} title="Newest Arrivals" />
      <ViewAllProductsButton />
    </>
  );
};

export default HomePage;
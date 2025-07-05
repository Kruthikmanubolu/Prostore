import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { getFeaturedProducts } from "@/lib/actions/product.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";

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
    </>
  );
};

export default HomePage;
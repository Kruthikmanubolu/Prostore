import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  
  const LatestProducts = await getLatestProducts();
  const mappedProducts = LatestProducts.map(product => ({
  name: product.name,
  id: product.id,
  slug: product.slug,
  Category: product.category,
  images: product.images,
  Brand: product.brand,
  Description: product.description,
  stock: product.stock,
  numReviews: product.numReviews,
  isFeatured: product.isFeatured,
  banner: product.banner,
  createdAt: product.createdAt,
  price: product.price,
  rating: product.rating
}));

return <ProductList data={mappedProducts} title="Newest Arrivals" />;
}
 
export default HomePage;
import ProductDetailPage from "./ProductDetailPage";
import { supabase } from "../../../lib/supabase";

// export async function generateStaticParams() {
//   const { data: products } = await supabase.from("products").select("id");
//   if (!products) return [];

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }
export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

export default function ProductPage({ params }) {
  return <ProductDetailPage productId={params.id} />;
}

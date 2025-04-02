// app/products/[brand]/page.tsx
import Loading from '@/app/components/Loading';
import ProductList from './ProductList';
import { Suspense } from 'react';


export default function BrandPage({ 
  params 
}: { 
  params: { brand: string } 
}) {
  return (
   
      <div className="min-h-screen pt-24 pb-12">
      <ProductList brand={params.brand} />
    </div>
    
  );

  /**
   * Option 2: With API Integration (When Ready)
   * -------------------------------------------
   * Uncomment when you have your API set up
   */
  // try {
  //   const laptops = await getLaptopsByBrand(params.brand);
  //   return (
  //     <div className="min-h-screen pt-24 pb-12">
  //       <ProductList brand={params.brand} initialLaptops={laptops} />
  //     </div>
  //   );
  // } catch (error) {
  //   console.error('Failed to load laptops:', error);
  //   return (
  //     <div className="min-h-screen pt-24 pb-12">
  //       <div className="container mx-auto px-6 text-center py-12">
  //         <h2 className="text-2xl text-red-600">Failed to load products</h2>
  //         <p className="text-gray-600 mt-2">
  //           Please try again later or contact support
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
}
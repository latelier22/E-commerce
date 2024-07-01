import Hero from './_sections/Hero';
import CategorySection from './_sections/CategorySection';
import SidebarMenu from './_sections/SidebarMenu';
import ProductsSection from './_sections/ProductsSection';
import { BestSellersType } from '@/types';
import { bestSellersProducts } from '@/data/products';
import ProductDetailsCard from '../product-details/[id]/_components/ProductDetailsCard';

export default async function page() {
  let getBestSellersProduct: {data: BestSellersType} = await bestSellersProducts("product")
  //console.log("getBestSellersProduct ds Home",getBestSellersProduct)
  return (
    <div className="container-m mt-5 space-y-5 px-4">
      <Hero />
      <CategorySection />
      <section className='flex lg:relative'>
        <SidebarMenu />
        <div className='lg:w-3/4 space-y-4'>
          {getBestSellersProduct.data[0].attributes.product.data && <>
              <h1 className='text-xl font-bold mt-2 ms-1 border-b pb-2'>{getBestSellersProduct.data[0].attributes.name}</h1>
              <ProductDetailsCard isHome product={getBestSellersProduct.data[0].attributes.product.data}/>
            </>}
          <h1 className='text-xl font-bold mt-2 ms-1 border-b pb-2'>New Products</h1>
          <ProductsSection />
        </div>
      </section>
    </div>
  )
}

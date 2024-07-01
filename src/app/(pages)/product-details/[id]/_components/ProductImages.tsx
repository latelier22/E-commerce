'use client'
import { ImageType } from "@/types";
import Image from "next/image"
import { useState } from "react"

export default function ProductImages({images, isHome}: {images: ImageType[],  isHome?: boolean}) {
  const [imageSrc, setImageSrc] = useState<ImageType|null>(images.length > 0 ? images[Math.floor(Math.random() * images.length)] : null);
  function isFive() : ImageType[] {
    return images.length >= 5 ? images.slice(0, 5) : images
  }
  return (
    <div className="w-full md:w-[31.25rem]">
       {imageSrc ? <Image priority={true} className={`rounded-box md:w-[500px] md:h-[500px] ${!isHome && "border"}`} src={`http://vps.latelier22.fr:1330${imageSrc.attributes.url}`} width={500} height={400} alt={imageSrc.attributes.alternativeText || 'ddd'} /> : 
         <span className="text-xl font-bold text-base-content/50" >No Image</span>
       }
       <div className="hidden">
        <span className="w-1/2"></span>
        <span className="w-1/3"></span>
        <span className="w-1/4"></span>
        <span className="w-1/5"></span>
       </div>
       {!isHome && images.length > 1 && <div className="mt-2 join join-horizontal divide-x border h-16 md:h-32">
         {isFive().map((image, index) => (
           <Image priority={true}
              onClick={() => setImageSrc(images[index])} 
              width={100}
              height={100}
              key={index}
              className={`join-item cursor-pointer w-1/${isFive().length} ${imageSrc?.attributes.url === image.attributes.url ?  'ring-2 z-10' : ' '}`}
              src={`http://vps.latelier22.fr:1330${image.attributes.url}`} alt={image.attributes.name} />
         ))}
       </div>}
    </div>
  )
}

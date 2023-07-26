"use client"
import LazyImage from "./components/RandomCat";
import React, {useEffect, useState} from "react";

export default function Home() {

  const [images, setImages] = useState<ICatImageItem[]>([])

    useEffect(() => {
        newCat()
    },[])

    const newCat = async() => {
      const getCat = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_q8qmvZevulPjVIkP5y6h43j90AFhcJn9IT3w4YalnTEPdBf26tadJg3OP6a9hVkG`)
                .then(response => response.json())
                .then((data) => {
                  setImages([...images,data[0]])
                })
                .catch(err => console.log(err))
    }

    const deleteCat = (id:string) => {
      const newImages = images.filter((image) => image.id !== id);
      setImages(newImages);
    }

  return (
    <main>
      <h1 className="text-3xl font-bold text-center m-6">Bienvenido</h1>
      <p className="text-center text-2xl mt-6 font-light">Hice esta página para probar algunas herramientas nuevas que quería aprender, esta hecha con Next.js, TypeScript y Tailwind CSS 🐱</p>
      <p className="text-center text-xl mb-6 font-light">(si quieres eliminar alguna imagen, solo haz click sobre ella)</p>
      <div className="flex justify-center">
        <button className="bg-indigo-500 text-white rounded p-3" onClick={() => {
          newCat()
        }}>Añadir gato</button>
      </div>
      {images.map((image:ICatImageItem, index:number):JSX.Element => {
        const imageUrl:string = image.url
        const id:string = image.id
        return(
          <div className="flex justify-center content-center m-6" key={index}>
            <LazyImage
              src={imageUrl}
              id={id}
              onClick={() => deleteCat(id)}
              width={320} 
              height="auto" 
              className='rounded'
              alt="Gato"
            />
          </div>
        )
      })}
    </main>
  )
}

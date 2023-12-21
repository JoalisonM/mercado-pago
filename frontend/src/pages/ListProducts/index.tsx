import { Link } from "react-router-dom";
import { useKeenSlider } from 'keen-slider/react';

import { Image } from "../../components/Image";
import { HomeContainer, Product } from "./styles";

const products = [
  {
    id: "1",
    name: "Camisa 1",
    price: 1.00,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: "2",
    name: "Camisa 2",
    price: 33.00,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: "3",
    name: "Camisa 3",
    price: 33.00,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
];

export const ListProducts = () => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`product/${product.id}`}
          state={{
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          }}
        >
          <Product className="keen-slider__slide">
            <Image imageUrl={product.imageUrl} />

            <footer>
              <strong>{product.name}</strong>
              <span>
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price!)
                }
              </span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
};
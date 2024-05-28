import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/Carrousel.css'


const CarouselComponent = () => {
  return (
    <Carousel showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={4000}>
      <div >
        <img src="/assets/Anuncio1.jpg" alt="Anuncio 1" style={{ maxHeight: '750px' }}/>
      </div>
      <div>
        <img src="/assets/Anuncio2.jpg" alt="Anuncio 2" style={{ maxHeight: '750px' }}/>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import image1 from './image-carousel-tests/monke1.jpg'
import image2 from './image-carousel-tests/monke2.jpg'

class ImageCarousel extends React.Component{
	render() {
        return (
            <Carousel showArrows={true}>
                <div>
                    <img src={image1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={image2} />
                    <p className="legend">Legend 2</p>
                </div>
            </Carousel>
        );
    }
}

export default ImageCarousel;



/* For testing
import ImageCarousel from './components/image-carousel'

<ImageCarousel/>
*/
import React from 'react'

/**
 * MainCarousal Component
 * 
 * Purpose:
 * - Displays a carousel with 4 images
 * - Allows navigation between slides using anchor buttons
 */
const MainCarousal = () => {
  return (
    <div className='mb-10'> {/* Adds bottom spacing */}

      {/*  Carousel container */}
      <div className="carousel w-full">

        {/*  Slide 1 */}
        <div id="item1" className="carousel-item w-full">
          <img
            alt="Carousel image" // accessibility text
            src="https://www.infinitimall.com/wp-content/uploads/2022/06/Nykaa-Health-Beauty-Infinti-Mall-Andheri.jpg"
            className="w-full h-96" // full width + fixed height
          />
        </div>

        {/*  Slide 2 */}
        <div id="item2" className="carousel-item w-full">
          <img
            alt="Carousel image"
            src="https://theradishingreview.com/wp-content/uploads/2020/03/SkinCare_RR.jpg"
            className="w-full h-96"
          />
        </div>

        {/* Slide 3 */}
        <div id="item3" className="carousel-item w-full">
          <img
            alt="Carousel image"
            src="https://tse1.mm.bing.net/th/id/OIP.J5qj_osiVlVpko8oeotEOQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            className="w-full h-96"
          />
        </div>

        {/*  Slide 4 */}
        <div id="item4" className="carousel-item w-full">
          <img
            alt="Carousel image"
            src="https://tse1.explicit.bing.net/th/id/OIP.-SAmCK6Bj0TiQTOZIJOUKAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
            className="w-full h-96"
          />
        </div>

      </div>

      {/*  Navigation buttons (jump to slides using anchor links) */}
      <div className="flex w-full justify-center gap-2 py-2">

        {/* Each button scrolls to corresponding slide */}
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>

      </div>
    </div>
  )
}

export default MainCarousal
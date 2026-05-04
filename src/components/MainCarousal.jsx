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
            src="/images/luna-banner1.png"
            className="w-full h-96" // full width + fixed height
          />
        </div>

        {/*  Slide 2 */}
        <div id="item2" className="carousel-item w-full">
          <img
            alt="Carousel image"
            src="/images/luna-banner2.png"
            className="w-full h-96"
          />
        </div>

        {/* Slide 3 */}
        <div id="item3" className="carousel-item w-full">
          <img
            alt="Carousel image"
            src="/images/luna-banner3.png"
            className="w-full h-96"
          />
        </div>

        {/*  Slide 4 */}
        <div id="item4" className="carousel-item w-full">
          <img
            alt="Carousel image"
            src="/images/luna-banner4.png"
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
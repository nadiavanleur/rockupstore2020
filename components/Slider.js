import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";

class Slider extends Component {
  render() {
    const { children } = this.props;
    const moreThanOneSlide = children && children.length > 1;

    return (
      <Carousel
        className="c-slider"
        showStatus={false}
        thumbWidth={50}
        infiniteLoop={moreThanOneSlide}
        useKeyboardArrows={moreThanOneSlide}
        showIndicators={moreThanOneSlide}
        showArrows={moreThanOneSlide}
        showThumbs={moreThanOneSlide}
        swipeable={moreThanOneSlide}
      >
        {children}
      </Carousel>
    );
  }
}

export default Slider;

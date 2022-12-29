import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./SlickSlider.styles.css"

import { FC } from "react"
import Slider, { Settings as SliderProps } from "react-slick"

interface Props extends SliderProps {
    slides: JSX.Element[]
}

const SimpleSlider: FC<Props> = (props) => {
    console.log(props)

    return (
        <div className={"sliderClass"} style={{width: "100%"}}>
            <Slider {...props}>
                {props.slides.map(slide => (
                    <div className={'sdg'}>{slide}</div>
                ))}
            </Slider>
        </div>
    );
}

const defaultProps: SliderProps = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    speed: 5e2,
    autoplay: false,
    autoplaySpeed: 4e3,
}
SimpleSlider.defaultProps = defaultProps

export default SimpleSlider
import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function ProductIcon(props) {
    return (
        <Svg
            width={20}
            height={21}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M18.333 8.017V4.234c0-1.175-.533-1.65-1.858-1.65h-3.367c-1.325 0-1.858.475-1.858 1.65v3.775c0 1.183.533 1.65 1.858 1.65h3.367c1.325.008 1.858-.467 1.858-1.642zM18.333 17.392v-3.366c0-1.325-.533-1.859-1.858-1.859h-3.367c-1.325 0-1.858.534-1.858 1.859v3.366c0 1.325.533 1.859 1.858 1.859h3.367c1.325 0 1.858-.534 1.858-1.859zM8.75 8.017V4.234c0-1.175-.533-1.65-1.858-1.65H3.525c-1.325 0-1.858.475-1.858 1.65v3.775c0 1.183.533 1.65 1.858 1.65h3.367c1.325.008 1.858-.467 1.858-1.642zM8.75 17.392v-3.366c0-1.325-.533-1.859-1.858-1.859H3.525c-1.325 0-1.858.534-1.858 1.859v3.366c0 1.325.533 1.859 1.858 1.859h3.367c1.325 0 1.858-.534 1.858-1.859z"
                fill={props.color || "#0F0F0F"}
            />
        </Svg>
    )
}

export default ProductIcon

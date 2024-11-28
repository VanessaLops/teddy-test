import * as React from "react"
import Svg, {Path} from "react-native-svg"

function ClientsIcon(props) {
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
                d="M10 2.625a3.962 3.962 0 00-3.958 3.958c0 2.142 1.675 3.875 3.858 3.95a.675.675 0 01.183 0H10.142a3.948 3.948 0 003.816-3.95A3.962 3.962 0 0010 2.625zM14.233 12.75c-2.325-1.55-6.116-1.55-8.458 0-1.058.708-1.642 1.667-1.642 2.692 0 1.025.584 1.975 1.634 2.675 1.166.783 2.7 1.175 4.233 1.175 1.533 0 3.067-.392 4.233-1.175 1.05-.709 1.634-1.659 1.634-2.692-.009-1.025-.584-1.975-1.634-2.675z"
                fill={props.color || "#0F0F0F"} 
            />
        </Svg>
    )
}

export default ClientsIcon

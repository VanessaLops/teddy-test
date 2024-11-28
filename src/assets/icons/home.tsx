import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props) {
    return (
        <Svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16.358 5.675L10.9 1.308C9.833.458 8.167.45 7.108 1.3L1.65 5.675C.867 6.3.392 7.55.558 8.533l1.05 6.284c.242 1.408 1.55 2.516 2.975 2.516h8.834c1.408 0 2.741-1.133 2.983-2.525l1.05-6.283c.15-.975-.325-2.225-1.092-2.85zM9.625 14a.63.63 0 01-.625.625.63.63 0 01-.625-.625v-2.5A.63.63 0 019 10.875a.63.63 0 01.625.625V14z"
                fill={props.color || "#0F0F0F"} 
            />
        </Svg>
    )
}

export default HomeIcon

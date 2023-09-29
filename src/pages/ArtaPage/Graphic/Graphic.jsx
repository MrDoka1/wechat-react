import React, {useEffect, useState} from 'react';
import * as d3 from "d3";

let firstLoad = true;

const Graphic = ({
                     data,
                     fPX, fPY, oPX, oPY, tX, tY,
                     width = 640,
                     height = 400,
                     marginTop = 20,
                     marginRight = 20,
                     marginBottom = 30,
                     marginLeft = 40
                 }) => {
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (firstLoad) {
            firstLoad = false;
            setTimeout(() => setLoad(false))
        }
    }, [])
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    const line = d3.line((d, i) => x(i), y);

    const svg = d3.select("span")
        .append("svg")
        .attr("width", 700)
        .attr("height", 300);

    const gx = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x));
    gx.transition()
        .duration(750)
        .call(d3.axisBottom(x));

    svg.append("circle")
        .attr("r", 2.5)
        .attr("cx", x(tX))
        .attr("cy", x(tY))

    svg.append("circle")
        .attr("r", 2.5)
        .attr("cx", x(fPX))
        .attr("cy", x(fPY))
        .attr("color", "red")

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => 300 - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");
    
    return (
        <svg width={width} height={height}>
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
                {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
            </g>
        </svg>
    );
};

export default Graphic;
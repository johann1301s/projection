'use client'

import {add, multiply, projectPoint, TVector} from "@/ortho/ortho"
import {useEffect, useRef, useState} from "react"
import styled from "styled-components"

export default function Page() {
  const [angle, setAngle] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (typeof document !== 'object') return
    ref.current.innerHTML = ''
    for (let i = 0; i < cube.length; i++) {
      const j = angle/100
      const angleRad = 2*Math.PI*j
      const Ma = add([125,125, 100], multiply([Math.cos(angleRad), Math.sin(angleRad),0], Math.sqrt(2*125*125)))

      const [X, Y] = projectPoint(cube[i], O, Ma, G, 0, 200, 200)
      const point = document.createElement('DIV')

      point.className = 'point'
      point.style.left = X + 'px'
      point.style.bottom = Y + 'px'
      ref.current?.appendChild(point)
    }
  }, [angle])

  return (
    <Frame>
      <div ref={ref} style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        background: '#e9e9e9'
      }}/>
      <Slider
        onChange={({target}) => setAngle(parseInt(target.value))}
        type='range' min={0} max={100} step={1} value={angle}/>
    </Frame>
  )
}

const Frame = styled.div`
  .point {
    position: absolute;
    height: 2px;
    width: 2px;
    border-radius: 1px;
    background-color: black;
  }
`

const Slider = styled.input`
  position: relative;
  width: 400px;
`

const O: TVector = [125, 125, 25]
const G: TVector = [0, 0, 1]

const cube: TVector[] = [
  [100,100,0],
  [100,100,25],
  [100,100,50],
  [100,125,0],
  [100,125,50],
  [100,150,0],
  [100,150,25],
  [100,150,50],

  [125,100,0],
  [125,100,50],
  [125,150,0],
  [125,150,50],

  [150,100,0],
  [150,100,25],
  [150,100,50],
  [150,125,0],
  [150,125,50],
  [150,150,0],
  [150,150,25],
  [150,150,50],
]

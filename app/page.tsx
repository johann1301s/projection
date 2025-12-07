'use client'

import {add, multiply, projectPoint, TVector} from "@/ortho/ortho"
import {useEffect, useRef, useState} from "react"
import styled from "styled-components"

export default function Page() {
  const initalAngle = 0
  const [state, setState] = useState({
    angle: initalAngle,
    rotation: 0,
    C: createCameraFromAngle(initalAngle),
    O: [0,0,0] as TVector
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (typeof document !== 'object') return
    ref.current.innerHTML = ''
    for (let i = 0; i < currentShape.length; i++) {
      const p = state.rotation/100

      const P = currentShape[i]

      const [X, Y] = projectPoint(P, state.O, state.C, G, p, 200, 200)
      
      const point = document.createElement('DIV')
      point.className = 'point'
      point.dataset.x = P[0].toString()
      point.dataset.y = P[1].toString()
      point.dataset.z = P[2].toString()
      point.onclick = (event) => {
        const el = event.target as HTMLDivElement

        setState((p) => ({
          ...p,
          O: [
            Number(el.dataset.x),
            Number(el.dataset.y),
            Number(el.dataset.z),
          ]
        }))
      }

      point.style.left = X + 'px'
      point.style.bottom = Y + 'px'
      ref.current?.appendChild(point)
    }
  }, [state])

  const onAngleChange = (angle: number) => {
    const C = createCameraFromAngle(angle)

    setState((p) => ({
      ...p,
      C: C,
      angle: angle
    }))
  }

  return (
    <Frame>
      <div ref={ref} style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        background: '#e9e9e9'
      }}/>
      <div>
        Radians XY: {(state.angle/100).toFixed(2)}τ
      </div><br/>
      <Slider
        onChange={({target}) => onAngleChange(parseInt(target.value))}
        type='range' min={0} max={100} step={1} value={state.angle}/>
      <div>
        Rotation: {(state.rotation/100).toFixed(2)}τ
      </div><br/>

      <Slider
        onChange={({target}) => setState((p) => ({...p, rotation: parseInt(target.value)}))}
        type='range' min={0} max={100} step={1} value={state.rotation}/>

      <div>
        CameraPoint: [{state.C[0].toFixed(2)}, {state.C[1].toFixed(2)}, {state.C[2].toFixed(2)}]
      </div>
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

const G: TVector = [0, 0, 1]

const centerCube: TVector[] = [
  [-25, -25, -25],
  [-25, -25,   0],
  [-25, -25,  25],
  [-25,   0, -25],
  [-25,   0,  25],
  [-25,  25, -25],
  [-25,  25,   0],
  [-25,  25,  25],

  [  0, -25, -25],
  [  0, -25,  25],
  [  0,  25, -25],
  [  0,  25,  25],

  [ 25, -25, -25],
  [ 25, -25,   0],
  [ 25, -25,  25],
  [ 25,   0, -25],
  [ 25,   0,  25],
  [ 25,  25, -25],
  [ 25,  25,   0],
  [ 25,  25,  25],
]

const currentShape = centerCube

const createCameraFromAngle = (angle: number) => {
  const j = angle/100
  const angleRad = 2*Math.PI*j
  const C: TVector = add([0,0, 0], multiply([Math.cos(angleRad), Math.sin(angleRad),0], Math.sqrt(2*125*125)))
  
  return C
}

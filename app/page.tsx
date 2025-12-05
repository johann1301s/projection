'use client'

import {add, multiply, projectPoint, TVector} from "@/ortho/ortho"
import {useEffect, useRef, useState} from "react"
import styled from "styled-components"

export default function Page() {
  const [state, setState] = useState({
    angle: 0,
    rotation: 0,
    focX: 0,
    focY: 0,
    focZ: 0,
    camX: 50,
    camY: 50,
    camZ: 50
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (typeof document !== 'object') return
    ref.current.innerHTML = ''
    for (let i = 0; i < currentShape.length; i++) {
      const j = state.angle/100
      const p = state.rotation/100

      const angleRad = 2*Math.PI*j
      const O: TVector = [state.focX, state.focY, state.focZ]
      const C: TVector = add([0,0, 0], multiply([Math.cos(angleRad), Math.sin(angleRad),0], Math.sqrt(2*125*125)))

      const [X, Y] = projectPoint(currentShape[i], O, C, G, p, 200, 200)
      const point = document.createElement('DIV')

      point.className = 'point'
      point.style.left = X + 'px'
      point.style.bottom = Y + 'px'
      ref.current?.appendChild(point)
    }
  }, [state])

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
        onChange={({target}) => setState((p) => ({...p, angle: parseInt(target.value)}))}
        type='range' min={0} max={100} step={1} value={state.angle}/>
      <div>
        Rotation: {(state.rotation/100).toFixed(2)}τ
      </div><br/>
      <Slider
        onChange={({target}) => setState((p) => ({...p, rotation: parseInt(target.value)}))}
        type='range' min={0} max={100} step={1} value={state.rotation}/>
      <div>
        FocusPoint: [{state.focX}, {state.focY}, {state.focZ}]
      </div><br/>
      <input type='number' value={state.focX} onChange={({target}) => setState((p) => ({...p, focX: parseFloat(target.value)}))}/>
      <br/>
      <input type='number' value={state.focY} onChange={({target}) => setState((p) => ({...p, focY: parseFloat(target.value)}))}/>
      <br/>
      <input type='number' value={state.focZ} onChange={({target}) => setState((p) => ({...p, focZ: parseFloat(target.value)}))}/>
      <br/>

      <div>
        CameraPoint: [{state.camX}, {state.camY}, {state.camZ}]
      </div><br/>
      <input type='number' value={state.camX} onChange={({target}) => setState((p) => ({...p, camX: parseFloat(target.value)}))}/>
      <br/>
      <input type='number' value={state.camY} onChange={({target}) => setState((p) => ({...p, camY: parseFloat(target.value)}))}/>
      <br/>
      <input type='number' value={state.camZ} onChange={({target}) => setState((p) => ({...p, camZ: parseFloat(target.value)}))}/>
      <br/>
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

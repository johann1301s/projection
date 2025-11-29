'use client'
import React, { useState, useMemo } from "react";
import styled from "styled-components";

// -------------------- Math helpers --------------------

type Vec3 = [number, number, number];

const cross = (A: Vec3, B: Vec3): Vec3 => ([
  -A[2]*B[1] + A[1]*B[2],
   A[2]*B[0] - A[0]*B[2],
  -A[1]*B[0] + A[0]*B[1]
]);

const sub = (A: Vec3, B: Vec3): Vec3 => ([A[0]-B[0], A[1]-B[1], A[2]-B[2]]);
const add = (A: Vec3, B: Vec3): Vec3 => ([A[0]+B[0], A[1]+B[1], A[2]+B[2]]);
const mul = (A: Vec3, b: number): Vec3 => ([A[0]*b, A[1]*b, A[2]*b]);
const div = (A: Vec3, b: number): Vec3 => ([A[0]/b, A[1]/b, A[2]/b]);
const norm = (A: Vec3): number => Math.sqrt(A[0]**2 + A[1]**2 + A[2]**2);
const dot = (A: Vec3, B: Vec3): number => A[0]*B[0] + A[1]*B[1] + A[2]*B[2];

const getX = (C: Vec3, D: Vec3, N: Vec3, R: Vec3) => {
  const [c1,c2,c3] = C, [d1,d2,d3] = D, [n1,n2,n3] = N, [b1,b2,b3] = R;
  const den = (c3*d2*n1 - c2*d3*n1 - c3*d1*n2 + c1*d3*n2 + c2*d1*n3 - c1*d2*n3);
  const num = -(-b3*d2*n1 + b2*d3*n1 + b3*d1*n2 - b1*d3*n2 - b2*d1*n3 + b1*d2*n3);
  return num / den;
};

const getY = (C: Vec3, D: Vec3, N: Vec3, R: Vec3) => {
  const [c1,c2,c3] = C, [d1,d2,d3] = D, [n1,n2,n3] = N, [b1,b2,b3] = R;
  const den = (c3*d2*n1 - c2*d3*n1 - c3*d1*n2 + c1*d3*n2 + c2*d1*n3 - c1*d2*n3);
  const num = -(b3*c2*n1 - b2*c3*n1 - b3*c1*n2 + b1*c3*n2 + b2*c1*n3 - b1*c2*n3);
  return num / den;
};

// -------------------- Projection function --------------------

function project(
  P: Vec3,
  O: Vec3,
  L: Vec3,
  G: Vec3,
  k: number,
  e1: number,
  e2: number
) {
  const omega = 2 * Math.PI * k;

  const N = div(sub(O, L), norm(sub(O, L)));
  const A = div(cross(N, G), norm(cross(N, G)));
  const B = div(cross(A, N), norm(cross(A, N)));

  let C = add(mul(A, Math.cos(omega)), mul(B, Math.sin(omega)));
  C = div(C, norm(C));

  let D = add(mul(A, -Math.sin(omega)), mul(B, Math.cos(omega)));
  D = div(D, norm(D));

  const t = dot(sub(L, P), N);
  const d = dot(L, N);
  const R = add(
    add(sub(add(P, mul(N, t)), L), mul(N, d)),
    add(mul(C, e1 * 0.5), mul(D, e2 * 0.5))
  );

  return {
    x: getX(C, D, N, R),
    y: getY(C, D, N, R),
  };
}

// -------------------- Styled components --------------------

const Frame = styled.div<{ w: number; h: number }>`
  position: relative;
  width: ${p => p.w}px;
  height: ${p => p.h}px;
  background: white;
  border: 1px solid #e5e5e5;
  overflow: hidden;
`;

const Point = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 2px;
  height: 2px;
  background: black;
  border-radius: 1px;
  left: ${p => p.x}px;
  bottom: ${p => p.y}px;
`;

// -------------------- Component --------------------

export const OrthoProjection: React.FC = () => {
  const e1 = 200;
  const e2 = 200;

  const [slider, setSlider] = useState(50);

  const O: Vec3 = [125, 125, 25];
  const L0: Vec3 = [0, 60, 90];
  const G: Vec3 = [0, 0, 1];
  const k = 0;

  const cube: Vec3[] = [
    [100,100,0],[125,100,0],[150,100,0],[150,125,0],
    [150,150,0],[125,150,0],[100,150,0],[100,125,0],
    [100,100,50],[125,100,50],[150,100,50],[150,125,50],
    [150,150,50],[125,150,50],[100,150,50],[100,125,50],
  ];

  const camera = useMemo(() => {
    const j = slider / 100;
    const angle = 2 * Math.PI * j;
    return add(
      [125,125,100],
      mul([Math.cos(angle), Math.sin(angle), 0], Math.sqrt(2*125*125))
    );
  }, [slider]);

  const points = useMemo(() => {
    return cube.map((p) => project(p, O, camera, G, k, e1, e2));
  }, [camera]);

  return (
    <div style={{ width: "100%", textAlign: "center", paddingTop: 40 }}>
      <Frame w={e1} h={e2}>
        {points.map((p, i) => (
          <Point key={i} x={p.x} y={p.y} />
        ))}
      </Frame>

      <input
        type="range"
        min={0}
        max={100}
        value={slider}
        onChange={(e) => setSlider(Number(e.target.value))}
        style={{ width: e1, marginTop: 20 }}
      />
    </div>
  );
};

export default OrthoProjection
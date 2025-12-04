
type TVector = [number, number, number]

function getX(C: TVector, D: TVector, N: TVector, B: TVector) {
  const [c_1,c_2,c_3] = C
  const [d_1,d_2,d_3] = D
  const [n_1,n_2,n_3] = N
  const [b_1,b_2,b_3] = B

  const denominator = (c_3*d_2*n_1 - c_2*d_3*n_1 - c_3*d_1*n_2 + c_1*d_3*n_2 + c_2*d_1*n_3 - c_1*d_2*n_3)
  const numerator = -(-b_3*d_2*n_1 + b_2*d_3*n_1 + b_3*d_1*n_2 - b_1*d_3*n_2 - b_2*d_1*n_3 + b_1*d_2*n_3)
  const x = numerator/denominator
  
  return x
}

function getY(C: TVector, D: TVector, N: TVector, B: TVector) {
  const [c_1,c_2,c_3] = C
  const [d_1,d_2,d_3] = D
  const [n_1,n_2,n_3] = N
  const [b_1,b_2,b_3] = B

  const denominator = (c_3*d_2*n_1 - c_2*d_3*n_1 - c_3*d_1*n_2 + c_1*d_3*n_2 + c_2*d_1*n_3 - c_1*d_2*n_3)
  const numerator = -(b_3*c_2*n_1 - b_2*c_3*n_1 - b_3*c_1*n_2 + b_1*c_3*n_2 + b_2*c_1*n_3 - b_1*c_2*n_3)
  const y = numerator/denominator
  
  return y
}

function cross(A: TVector, B: TVector): TVector {
  return [-A[2]*B[1] + A[1]*B[2], A[2]*B[0] - A[0]*B[2], -A[1]*B[0] + A[0]*B[1]]
}

function sub(A: TVector, B: TVector): TVector {
  return [A[0]-B[0], A[1]-B[1], A[2]-B[2]]
}

function add(A: TVector, B: TVector): TVector {
  return [A[0]+B[0], A[1]+B[1], A[2]+B[2]]
}

function divide(A: TVector, b: number): TVector {
  return [A[0]/b,A[1]/b,A[2]/b]
}

function norm(A: TVector) {
  return Math.sqrt(A[0]*A[0] + A[1]*A[1] + A[2]*A[2])
}

function multiply(A: TVector, b: number): TVector {
  return [A[0]*b, A[1]*b, A[2]*b]
}

function dot(A: TVector, B: TVector) {
  return A[0]*B[0] + A[1]*B[1] + A[2]*B[2]
}

function project(
  projectPoint: TVector,
  focusPoint: TVector,
  cameraPoint: TVector,
  groundVector: TVector,
  rotation: number
) {
  const P = projectPoint
  const O = focusPoint
  const L = cameraPoint
  const G = groundVector
  const k = rotation

  const omega = 2*Math.PI*k
  const N = divide( sub(O,L), norm( sub(O,L) ) )
  const A = divide( cross(N,G), norm( cross(N,G) ) )
  const B = divide( cross(A,N), norm( cross(A,N) ) )
  let C = add(multiply(A, Math.cos(omega)), multiply(B, Math.sin(omega)))
  C = divide(C, norm(C))
  let D = add(multiply(A, -Math.sin(omega)), multiply(B, Math.cos(omega)))
  D = divide(D, norm(D))
  const t = dot(sub(L,P), N)
  const d = dot(L, N)
  const R = add(add(sub(add(P, multiply(N,t)), L), multiply(N,d)), add( multiply(C,e1*0.5), multiply(D,e2*0.5) ) )
  
  const point = document.createElement('DIV')
  point.className = "point"
  point.style.bottom = getY(C, D, N, R) + 'px'
  point.style.left = getX(C, D, N, R) + 'px'
  frame.appendChild(point)
}

const e1 = 200;
const e2 = 200;
const frame: HTMLDivElement = document.querySelector('#frame')!
frame.style.top = 'calc(50% - '+e2*0.5+'px)'
frame.style.left = 'calc(50% - '+e1*0.5+'px)'
frame.style.width = e1 + 'px'
frame.style.height = e2 + 'px'

const slider: HTMLInputElement = document.querySelector("#myRange")!
slider.style.top = 'calc(50% + 20px + '+e2*0.5+'px)'
slider.style.left = 'calc(50% - '+e1*0.5+'px)'
slider.style.width = e1 + 'px'
slider.style.height = 25 + 'px'

const O: TVector = [125, 125, 25]
const L: TVector = [0, 60, 90]
const G: TVector = [0, 0, 1]
const k = 0

const cube: TVector[] = [
  [100,100,0],
  [125,100,0],
  [150,100,0],
  [150,125,0],
  [150,150,0],
  [125,150,0],
  [100,150,0],
  [100,125,0],
  [100,100,50],
  [125,100,50],
  [150,100,50],
  [150,125,50],
  [150,150,50],
  [125,150,50],
  [100,150,50],
  [100,125,50],
];

for (let i = 0; i < cube.length; i++) {
  project(cube[i], O, L, G, k)
}

slider.oninput = function() {
  const j = parseFloat(slider.value)/100
  const angle = 2*Math.PI*j
  const Ma = add([125,125, 100], multiply([Math.cos(angle), Math.sin(angle),0], Math.sqrt(2*125*125)))
  frame.innerHTML = ''
  for (let i = 0; i < cube.length; i++) {
    project(cube[i], O, Ma, G, k)
  }
}

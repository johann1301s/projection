
export type TVector = [number, number, number]

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

export function cross(A: TVector, B: TVector): TVector {
  return [-A[2]*B[1] + A[1]*B[2], A[2]*B[0] - A[0]*B[2], -A[1]*B[0] + A[0]*B[1]]
}

export function sub(A: TVector, B: TVector): TVector {
  return [A[0]-B[0], A[1]-B[1], A[2]-B[2]]
}

export function add(A: TVector, B: TVector): TVector {
  return [A[0]+B[0], A[1]+B[1], A[2]+B[2]]
}

export function divide(A: TVector, b: number): TVector {
  return [A[0]/b,A[1]/b,A[2]/b]
}

function norm(A: TVector) {
  return Math.sqrt(A[0]*A[0] + A[1]*A[1] + A[2]*A[2])
}

export function multiply(A: TVector, b: number): TVector {
  return [A[0]*b, A[1]*b, A[2]*b]
}

function dot(A: TVector, B: TVector) {
  return A[0]*B[0] + A[1]*B[1] + A[2]*B[2]
}

export function projectPoint(
  pointToProject: TVector,
  focusPoint: TVector,
  cameraPoint: TVector,
  groundVector: TVector,
  rotation: number,
  e1: number,
  e2: number
) {
  const P = pointToProject
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
  const X = getX(C, D, N, R)
  const Y = getY(C, D, N, R)

  return [X, Y]
}

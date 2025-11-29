function getX(C, D, N, B) {
  c_1 = C[0]; c_2 = C[1]; c_3 = C[2];
  d_1 = D[0]; d_2 = D[1]; d_3 = D[2];
  n_1 = N[0]; n_2 = N[1]; n_3 = N[2];
  b_1 = B[0]; b_2 = B[1]; b_3 = B[2];
  let denominator = (c_3*d_2*n_1 - c_2*d_3*n_1 - c_3*d_1*n_2 + c_1*d_3*n_2 + c_2*d_1*n_3 - c_1*d_2*n_3);
  let numerator = -(-b_3*d_2*n_1 + b_2*d_3*n_1 + b_3*d_1*n_2 - b_1*d_3*n_2 - b_2*d_1*n_3 + b_1*d_2*n_3);
  let x = numerator/denominator;
  
  return x;
}

function getY(C, D, N, B) {
  c_1 = C[0]; c_2 = C[1]; c_3 = C[2];
  d_1 = D[0]; d_2 = D[1]; d_3 = D[2];
  n_1 = N[0]; n_2 = N[1]; n_3 = N[2];
  b_1 = B[0]; b_2 = B[1]; b_3 = B[2];
  let denominator = (c_3*d_2*n_1 - c_2*d_3*n_1 - c_3*d_1*n_2 + c_1*d_3*n_2 + c_2*d_1*n_3 - c_1*d_2*n_3);
  let numerator = -(b_3*c_2*n_1 - b_2*c_3*n_1 - b_3*c_1*n_2 + b_1*c_3*n_2 + b_2*c_1*n_3 - b_1*c_2*n_3);
  let y = numerator/denominator;
  return y;
}

function getZ(C, D, N, B) {
  c_1 = C[0]; c_2 = C[1]; c_3 = C[2];
  d_1 = D[0]; d_2 = D[1]; d_3 = D[2];
  n_1 = N[0]; n_2 = N[1]; n_3 = N[2];
  b_1 = B[0]; b_2 = B[1]; b_3 = B[2];
  let numerator = -(b_3*c_2*d_1 - b_2*c_3*d_1 - b_3*c_1*d_2 + b_1*c_3*d_2 + b_2*c_1*d_3 - b_1*c_2*d_3);
  let denominator = (-c_3*d_2*n_1 + c_2*d_3*n_1 + c_3*d_1*n_2 - c_1*d_3*n_2 - c_2*d_1*n_3 + c_1*d_2*n_3);
  let z = numerator/denominator;
  return z;
}

function cross(A, B) {
  return [-A[2]*B[1] + A[1]*B[2], A[2]*B[0] - A[0]*B[2], -A[1]*B[0] + A[0]*B[1]];
}

function sub(A, B) {
  return [A[0]-B[0],A[1]-B[1],A[2]-B[2]];
}

function add(A, B) {
  return [A[0]+B[0],A[1]+B[1],A[2]+B[2]];
}

function divide(A, b) {
  return [A[0]/b,A[1]/b,A[2]/b];
}

function norm(A) {
  return Math.sqrt(A[0]*A[0] + A[1]*A[1] + A[2]*A[2]);
}

function multiply(A, b) {
  return [A[0]*b,A[1]*b,A[2]*b];
}

function dot(A, B) {
  return A[0]*B[0] + A[1]*B[1] + A[2]*B[2];
}

function project(projectPoint, focusPoint, cameraPoint, groundVector, rotation) {
  P = projectPoint; O = focusPoint; L = cameraPoint; G = groundVector; k = rotation;
  let omega = 2*Math.PI*k;
  let N = divide( sub(O,L), norm( sub(O,L) ) );
  let A = divide( cross(N,G), norm( cross(N,G) ) );
  let B = divide( cross(A,N), norm( cross(A,N) ) );
  let C = add(multiply(A, Math.cos(omega)), multiply(B, Math.sin(omega)));
  C = divide(C, norm(C));
  let D = add(multiply(A, -Math.sin(omega)), multiply(B, Math.cos(omega)));
  D = divide(D, norm(D));
  let t = dot(sub(L,P), N);
  let d = dot(L, N);
  let R = add(add(sub(add(P, multiply(N,t)), L), multiply(N,d)), add( multiply(C,e1*0.5), multiply(D,e2*0.5) ) );
  let point = document.createElement('DIV');
  point.className = "point";
  point.style.bottom = getY(C, D, N, R) + 'px';
  point.style.left = getX(C, D, N, R) + 'px';
  frame.appendChild(point);
}

let e1 = 200;
let e2 = 200;
let frame = document.querySelector('#frame');
frame.style.top = 'calc(50% - '+e2*0.5+'px)';
frame.style.left = 'calc(50% - '+e1*0.5+'px)';
frame.style.width = e1 + 'px';
frame.style.height = e2 + 'px';

var slider = document.getElementById("myRange");
slider.style.top = 'calc(50% + 20px + '+e2*0.5+'px)';
slider.style.left = 'calc(50% - '+e1*0.5+'px)';
slider.style.width = e1 + 'px';
slider.style.height = 25 + 'px';

let P = [100,100,0];
let O = [125,125,25];
let L = [0,60,90];
let G = [0,0,1];
let k = 0;

let cube = [
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
  let j = slider.value/100;
  let angle = 2*Math.PI*j;
  let Ma = add([125,125, 100], multiply([Math.cos(angle),Math.sin(angle),0],Math.sqrt(2*125*125)));
  frame.innerHTML = '';
  for (let i = 0; i < cube.length; i++) {
    project(cube[i], O, Ma, G, k)
  }
}

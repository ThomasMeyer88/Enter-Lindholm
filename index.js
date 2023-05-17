const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const width = 1024;
const height = 576;

canvas.width = width
canvas.height = height

c.fillRect(0,0, width, height);
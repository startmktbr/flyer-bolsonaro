'use strict'

/** @type {HTMLInputElement} */
const $nameFormInput = document.querySelector('.js-name-form-input');
/** @type {HTMLButtonElement} */
const $nameFormButton = document.querySelector('.js-name-form-button');
/** @type {HTMLCanvasElement} */
const $canvas = document.querySelector('.js-canvas');
const $downloadLink = document.querySelector('.js-download-link');

const canvasContext = $canvas.getContext('2d');

const flyerBaseImage = new Image();
flyerBaseImage.src = 'flyer-base.jpg';

function getName() {
  return $nameFormInput.value.toUpperCase() || 'SEM NOME';
}

function drawImage() {
  canvasContext.drawImage(flyerBaseImage, 0, 0);
  canvasContext.fillStyle = '#fff';
  canvasContext.font = 'bold 102px var(--montserrat)'
  canvasContext.fillText(getName(), 60, 470);
}

function saveImage() {
  const url = $canvas.toDataURL();
  $downloadLink.href = url;
  $downloadLink.download = `flyer-${getName()}.jpg`;
  $downloadLink.click();
}

$nameFormInput.addEventListener('input', () => {
  drawImage();
});

$nameFormButton.addEventListener('pointerdown', () => {
  drawImage();
  saveImage();
});

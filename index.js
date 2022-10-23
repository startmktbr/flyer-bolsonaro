'use strict'

/** @type {HTMLInputElement} */
const $nameFormInput = document.querySelector('.js-name-form-input');
/** @type {HTMLButtonElement} */
const $nameFormButton = document.querySelector('.js-name-form-button');
/** @type {HTMLCanvasElement} */
const $canvas = document.querySelector('.js-canvas');

const canvasContext = $canvas.getContext('2d');

const flyerBaseImage = new Image();
flyerBaseImage.src = 'flyer-base.jpg';

function drawImage() {
  const name = $nameFormInput.value || 'Sem nome';
  canvasContext.drawImage(flyerBaseImage, 0, 0);
  
  canvasContext.fillStyle = '#fff';
  canvasContext.font = 'bold 102px var(--montserrat)'
  canvasContext.fillText(name.toUpperCase(), 60, 470);
}

$nameFormButton.addEventListener('pointerdown', () => {
  drawImage();
});

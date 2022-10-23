'use strict'

class CanvasFlyer {
  #nameInputElement;
  #downloadButtonElement;
  #canvasContainerElement;
  #canvasElement;
  #imageSource;

  /**
   * @param {HTMLInputElement} nameInputElement
   * @param {HTMLButtonElement} downloadButtonElement
   * @param {string} imageSource
   * @param {HTMLCanvasElement} canvasElement
   * @param {HTMLDivElement} canvasContainerElement
   */
  constructor(
      nameInputElement,
      downloadButtonElement,
      imageSource,
      canvasElement,
      canvasContainerElement,
  ) {
    this.#nameInputElement = nameInputElement;
    this.#downloadButtonElement = downloadButtonElement;
    this.#imageSource = imageSource;
    this.#canvasElement = canvasElement;
    this.#canvasContainerElement = canvasContainerElement;

    window.addEventListener('load', () => {
      this.resizeCanvasElement();
    });

    window.addEventListener('resize', () => {
      this.resizeCanvasElement();
    });
  }

  resizeCanvasElement() {
    this.#canvasElement.width = this.#canvasContainerElement.offsetWidth;
    this.#canvasElement.height = this.#canvasContainerElement.offsetHeight;
  }
}

const nameInputElement = document.querySelector('.js-name-form-input');
const downloadButtonElement = document.querySelector('.js-name-form-button');
const canvasContainerElement = document.querySelector('.js-container');
const canvasElement = document.querySelector('.js-canvas');
const imageSource = 'flyer-base.jpg';

const canvasFlyer = new CanvasFlyer(
    nameInputElement,
    downloadButtonElement,
    imageSource,
    canvasElement,
    canvasContainerElement,
);

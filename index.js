'use strict'

/**
 * Represents a flyer application that uses canvas.
 */
class CanvasFlyerApp {
  #nameInputElement;
  #downloadButtonElement;
  #canvasContainerElement;
  #canvasElement;
  #imageSource;

  /**
   * Creates a new instance of a `CanvasFlyerApp`.
   * @param {HTMLInputElement} nameInputElement The input element of type text
   * that contains the person's name.
   * @param {HTMLButtonElement} downloadButtonElement The button element that
   * downloads the image.
   * @param {string} imageSource The source of the image.
   * @param {HTMLCanvasElement} canvasElement The canvas element.
   * @param {HTMLDivElement} canvasContainerElement The container of the canvas
   * element.
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

    this.#nameInputElement.addEventListener('input', () => {
      this.drawCanvasElement();
    });

    window.addEventListener('load', () => {
      this.drawCanvasElement();
    });

    window.addEventListener('resize', () => {
      this.drawCanvasElement();
    });
  }

  /**
   * Creates the canvas element and draw with its contents.
   */
  drawCanvasElement() {
    this.resizeCanvasElement();
    this.drawImageAndText();
  }

  /**
   * Recreate the canvas element to fit inside its container.
   */
  resizeCanvasElement() {
    this.#canvasElement.width = this.#canvasContainerElement.offsetWidth;
    this.#canvasElement.height = this.#canvasContainerElement.offsetWidth;
  }

  /**
   * Draws the image in the canvas element.
   */
  drawImageAndText() {
    const canvasContext = this.#canvasElement.getContext('2d');

    const imageElement = new Image();
    imageElement.src = this.#imageSource;

    imageElement.addEventListener('load', () => {
      canvasContext.drawImage(
          imageElement,
          0,
          0,
          this.#canvasElement.width,
          this.#canvasElement.height,
      );
      this.drawText();
    });
  }

  getName() {
    return this.#nameInputElement.value.toUpperCase() || 'SEM NOME';
  }

  drawText() {
    const canvasContext = this.#canvasElement.getContext('2d');
    canvasContext.fillStyle = '#fff';
    canvasContext.font = `bold min(5vw, 60px) "montserrat", sans-serif`;
    canvasContext.fillText(
        this.getName(),
        this.#canvasElement.width * 0.07,
        this.#canvasElement.height * 0.42,
    );
  }
}

const nameInputElement = document.querySelector('.js-name-form-input');
const downloadButtonElement = document.querySelector('.js-name-form-button');
const imageSource = 'flyer-base.jpg';
const canvasElement = document.querySelector('.js-canvas');
const canvasContainerElement = document.querySelector('.js-container');

const canvasFlyer = new CanvasFlyerApp(
    nameInputElement,
    downloadButtonElement,
    imageSource,
    canvasElement,
    canvasContainerElement,
);

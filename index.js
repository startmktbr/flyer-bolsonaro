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

    this.#nameInputElement.addEventListener('input', async () => {
      await this.drawCanvasElement();
    });

    this.#downloadButtonElement.addEventListener('pointerdown', async () => {
      await this.downloadImage();
    });

    window.addEventListener('load', async () => {
      await this.drawCanvasElement();
    });

    window.addEventListener('resize', async () => {
      await this.drawCanvasElement();
    });
  }

  /**
   * Creates the canvas element and draw with its contents.
   */
  async drawCanvasElement() {
    this.resizeCanvasElementToContainer();
    await this.drawImage();
    this.drawText();
  }

  /**
   * Recreate the canvas element to fit inside its container.
   */
  resizeCanvasElementToContainer() {
    this.#canvasElement.width = this.#canvasContainerElement.offsetWidth;
    this.#canvasElement.height = this.#canvasContainerElement.offsetWidth;
  }

  /**
   * Draws the image in the canvas element.
   */
  async drawImage() {
    return new Promise((resolve, _reject) => {
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
        resolve();
      });
    });
  }

  /**
   * Gets the person's name from the input or use a default one. 
   * @returns The person's name or a default one.
   */
  getName() {
    return this.#nameInputElement.value.toUpperCase() || 'SEU NOME';
  }

  /**
   * Draws the text containing the person's name in the canvas element.
   */
  drawText() {
    const canvasContext = this.#canvasElement.getContext('2d');
    canvasContext.fillStyle = '#fff';
    canvasContext.font = `bold min(${this.#canvasElement.width * 0.07}px, 60px) "montserrat", sans-serif`;

    canvasContext.fillText(
        this.getName(),
        this.#canvasElement.width * 0.07,
        this.#canvasElement.height * 0.42,
    );
  }

  /**
   * Downloads the image to the client's device.
   */
  async downloadImage() {
    this.#canvasElement.width = 1000;
    this.#canvasElement.height = 1000;

    await this.drawImage();
    this.drawText();

    const downloadUrl = this.#canvasElement.toDataURL();
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.download =
        `flyer-bolsonaro-${this.getName().replace(/ /g, '-')}.png`;
    downloadAnchor.href = downloadUrl;
    
    downloadAnchor.click();
    
    await this.drawCanvasElement();
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

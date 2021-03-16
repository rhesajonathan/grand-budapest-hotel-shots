import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ColorThief from 'colorthief'
import React,{ useEffect, useState } from 'react'

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

/**
 * @param {string} url - The source image
 * @param {number} aspectRatio - The aspect ratio
 * @return {Promise<HTMLCanvasElement>} A Promise that resolves with the resulting image as a canvas element
 */
const crop = (url, aspectRatio) => {
  // we return a Promise that gets resolved with our canvas element
  return new Promise((resolve) => {
    // this image will hold our source image data
    const inputImage = new Image();

    // we want to wait for our image to load
    inputImage.onload = () => {
      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;

      // create a canvas that will present the output image
      const outputImage = document.getElementById('myCanvas');

      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext("2d");
      ctx.drawImage(inputImage, outputX, outputY);
      resolve(outputImage);
    };

    // start loading our image
    inputImage.src = url;
  });
}

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState()
  
  useEffect(() => {
    console.log('asdasd')
    const colorThief = new ColorThief();
    const img = document.getElementById('shot');
    const randomNumber = "" + (Math.floor(Math.random() * 5995) + 1);
    const shotNumber = ('0000'+ randomNumber).substring(randomNumber.length);
    console.log(shotNumber)
    const imageURL = `/GrandBudapest/The.Grand.Budapest.Hotel.2014.1080p.BluRay.x264.YIFY%20${shotNumber}.jpg`;
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    img.crossOrigin = 'Anonymous';
    // img.src = googleProxyURL + encodeURIComponent(imageURL);
    img.src = imageURL
    img.onload = function() {
      const color = colorThief.getColor(img)
      console.log(color)
      console.log(rgbToHex(...color))
      setBackgroundColor(rgbToHex(...color))
    }
    // crop(imageURL, 4 / 3)
  },[]); 

  return (
    <div className={styles.container} style={{'backgroundColor': backgroundColor}}>
      <img className={styles.logo} src="https://i.vimeocdn.com/video/512942783.webp?mw=1100&mh=619&q=70"/>
      {/* <canvas id="myCanvas"  className={styles.myCanvas}></canvas> */}
      <div  className={styles.shotWrapper}>
        <img id="shot" className={styles.shot}/>
      </div>
    </div>
  )
}

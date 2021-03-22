import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ColorThief from 'colorthief'
import React,{ useEffect, useState } from 'react'

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

const shotTypeClass = (shotType) => {
  if(shotType === 1) {
    return styles.shot
  } else if(shotType === 2) {
    return styles.shot2
  } else if(shotType === 3) {
    return styles.shot3
  } else {
    return styles.shot4
  }
}

const wrapperTypeClass = (shotType) => {
  if(shotType === 1) {
    return styles.shotWrapper1
  } else if(shotType === 2) {
    return styles.shotWrapper2
  } else if(shotType === 3) {
    return styles.shotWrapper3
  } else {
    return styles.shotWrapper4
  }
}


export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState()
  const [shotType, setShotType] = useState()
  const [heightWrapper, setHeightWrapper] = useState()
  const [imageNumber, setImageNumber] = useState()

  useEffect(() => {
    loadImage()
  },[]); 

  const loadImage = () => {
    const colorThief = new ColorThief();
    const img = document.getElementById('shot');
    const randomNumber = "" + (Math.floor(Math.random() * 5621) + 40)
    const shotNumber = ('0000'+ randomNumber).substring(randomNumber.length);
    // const shotNumber = '5614'
    if (parseInt(shotNumber) >= 57 && parseInt(shotNumber) <= 110 || parseInt(shotNumber) >= 5614 && parseInt(shotNumber) <= 5621) {
      setShotType(1)
    } else if (parseInt(shotNumber) >= 111 && parseInt(shotNumber) <= 178  || parseInt(shotNumber) >= 5604 && parseInt(shotNumber) <= 5613 ) {
      setShotType(2)
    } else if (parseInt(shotNumber) >= 211 && parseInt(shotNumber) <= 561 || parseInt(shotNumber) >= 934 && parseInt(shotNumber) <= 940 || parseInt(shotNumber) >= 2725 && parseInt(shotNumber) <= 2764 || parseInt(shotNumber) >= 5459 && parseInt(shotNumber) <= 5603 ) {
      setShotType(3)
    } else {
      setHeightWrapper('')
      setShotType(4)
    }
    console.log(shotNumber)
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/grand-budapest-hotel-shots.appspot.com/o/shots%2FGrand-Budapest-Hotel%20${shotNumber}.jpg?alt=media`;
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    img.crossOrigin = 'Anonymous';
    img.src = googleProxyURL + encodeURIComponent(imageURL);
    img.onload = function() {
      const color = colorThief.getColor(img)
      console.log(color)
      console.log(rgbToHex(...color))
      setBackgroundColor(rgbToHex(...color))
    }
  }

  const reload = () => {
    location.reload();

  }

  return (
    <div className={styles.container} style={{'backgroundColor': backgroundColor}}>
      <img className={styles.logo} src="https://i.vimeocdn.com/video/512942783.webp?mw=1100&mh=619&q=70"/>
      <div  className={`${styles.shotWrapper} ${wrapperTypeClass(shotType)}`}>
          <img id="shot" className={shotTypeClass(shotType)}/>
      </div>
      <div className={styles.button} onClick={reload}>Reload</div>
    </div>
    
  )
}

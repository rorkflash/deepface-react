/* eslint-disable */
import React, { useState, useEffect } from "react"
import DCFaceID from "./dcfaceidmodule"
import styles from "./styles.module.css"
import DeepScanner from "./scanner"
import DeepFace from "./deepface"


function DeepStory(props) {
  const [faceID, setFaceID] = useState(null)
  const [ds, setDS] = useState(null)



  return <div id='s-cont' className={styles['df-container']} />
}

export {DeepStory, DeepScanner, DeepFace};

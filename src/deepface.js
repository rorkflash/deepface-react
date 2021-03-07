/* eslint-disable */
import React, { useState, useEffect } from "react"
import DCFaceID from "./dcfaceidmodule"
import styles from "./styles.module.css"

export default function DeepFace(props) {
  const [faceID, setFaceID] = useState(null)
  const [ds, setDS] = useState(null)

  return <div id='s-cont' className={styles['df-container']} />
}

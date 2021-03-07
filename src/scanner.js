/* eslint-disable */
import React, { useState, useEffect } from "react"
import DCFaceID from "./dcfaceidmodule"
import styles from "./styles.module.css"

export default function DeepScanner(props) {
  const [faceID, setFaceID] = useState(null)
  const [ds, setDS] = useState(null)

  useEffect(() => {
    console.log("useEffect init");
    // eslint-disable-next-line react/prop-types
    const faceID = new DCFaceID({
      url: props.host,
      headers: {'rr-key1': "value1"}
    })
    const size = 300
    const _ds = faceID.createDeepScan('s-cont', {
      // eslint-disable-next-line react/prop-types
      width: props.width || size,
      height: props.height || size,
      mrzOptions: props.mrzOptions || { server: true },
      camera: props.camera || { fillOnMobile: true, cutEdge: true },
      scan_worker_path: props.scan_worker_path || 'js/deepscanworker.min.js',
      face_worker_path: props.face_worker_path || 'js/deeptinyfaceworker.min.js',
      useServerSide: props.useServerSide || true,
      onInit: () => {
        if (props.onInit !== undefined && typeof props.onInit == 'function') {
          props.onInit()
          if (props.start && ds == null) {
            ds.start()
          }
        }
      },
      onCardDetected: (cards) => {
        if (props.onCardDetected !== undefined
          && typeof props.onCardDetected == 'function')
        {
          props.onCardDetected(cards)
        }
      },
      onCommand: (command) => {
        if (props.onCommand !== undefined
          && typeof props.onCommand == 'function')
        {
          props.onCommand(command)
        }
      },
      onFinished: (result) => {
        if (props.onFinished !== undefined
          && typeof props.onFinished == 'function')
        {
          props.onFinished(result)
        }
      }
    })

    setFaceID(faceID)
    setDS(_ds)
  }, [])

  useEffect(() => {
    if (faceID != null) {

    }
  }, [faceID])

  useEffect(() => {
    if (ds != null) {
      if (props.start) {
        ds.start();
      } else {
        ds.close();
      }
    }
  }, [props.start])

  useEffect(() => {
    if (props.verify != null) {
      faceID.verify(props.verify, (result) => {
        if (props.onVerified !== undefined
          && typeof props.onVerified == 'function') {
          props.onVerified(result);
        }
      });
    }
  }, [props.verify])

  return <div id='s-cont' className={styles['df-container']} />
}

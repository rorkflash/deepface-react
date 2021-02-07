import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import DCFaceID from './dcfaceidmodule'

/* eslint-disable */
export function DeepScanner(props) {
  const [faceID, setFaceID] = useState(null)
  const [ds, setDS] = useState(null)

  useEffect(() => {
    console.log('useEffect')
    document.getElementById('s-cont').innerHTML = ''
    // eslint-disable-next-line react/prop-types
    const faceID = new DCFaceID({ url: props.url, headers: {} })
    setFaceID(faceID)
  }, [])

  useEffect(() => {
    if (faceID != null) {
      let size = 450
      const cont = document.querySelector('.middle-container')
      const _w = cont.offsetWidth
      if (_w > 0 && _w < size) {
        size = _w - 10
      }

      const _ds = faceID.createDeepScan('s-cont', {
        // eslint-disable-next-line react/prop-types
        width: props.size || 100,
        height: props.size || 100,
        mrzOptions: props.mrzOptions || { server: true },
        camera: props.camera || { fillOnMobile: true, cutEdge: true },
        scan_worker_path: props.scan_worker_path || 'js/deepscanworker.min.js',
        face_worker_path: props.face_worker_path || 'js/deeptinyfaceworker.min.js',
        useServerSide: props.useServerSide || true,
        onInit: () => {
          if (props.onInit !== undefined && typeof props.onInit == 'function') {
            props.onInit()
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
          // console.log("command", command);
          // let text = ''
          // switch (command) {
          //   case 'none':
          //     text = 'initializing'
          //     loading(true)
          //     break
          //   case 'show':
          //     loading(false)
          //     text = 'please show Passport or ID card front side'
          //     break
          //   case 'id_back':
          //     setShowAnim(true)
          //     text = 'Please show back side of ID card'
          //     break
          //   case 'finish':
          //     text = 'Finishing'
          //     break
          //   default:
          //     break
          // }
          // setText(text)
        },
        onFinished: (result) => {
          if (props.onFinished !== undefined
            && typeof props.onFinished == 'function')
          {
            props.onFinished(result)
          }
          // console.log("finished", result);
          // setResult(result)
        }
      })
      setDS(_ds)
    }
  }, [faceID])

  return <div id='s-cont' className={styles.dfContainer} />
}

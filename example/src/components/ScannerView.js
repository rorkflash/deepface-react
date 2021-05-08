import React, {useState, useEffect} from "react";
import Lottie from "lottie-react";
import CardData from "../data/card.json"
import {GLOBAL_URL} from "../config"
import 'deepface-react/dist/index.css'
import {DeepScanner} from 'deepface-react'

function ScannerView(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [size, setSize] = useState(null);
    const [start, setStart] = useState(false);
    const [verify, setVerify] = useState(null);

    useEffect(() => {
        // console.log('useEffect');
        let size = 450;
        let cont = document.querySelector('.middle-container');
        let _w = cont.offsetWidth;
        if (_w > 0 && _w < size) {
          size = _w-10;
        }
        setSize(size);
    }, []);

    useEffect(() => {
          if (props.start === true) {
              setStart(true);
              setScanning(true);
          } else {
              setStart(false);
              setScanning(false);
              setText('');
          }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.start]);

    useEffect(() => {
        if (result != null) {
            if (result.status === true) {
                toVerify(result);
            } else {
                if (result.msg) {
                    onComplete({success:false, msg: result.msg});
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    function loading(state)
    {
        setIsLoading(state);
    }

    function hideAnim()
    {
        setShowAnim(false)
    }

    function onInit()
    {

    }

    function onCardDetected(card)
    {

    }

    function onCommand(command)
    {

    }

    function onFinished(result)
    {
      setResult(result);
      // onComplete(result);
      if (result != null) {
        if (result.status === true) {
          toVerify(result);
        } else {
          if (result.msg) {
            onComplete({success:false, msg: result.msg});
          }
        }
      }
    }

    function toVerify(data)
    {
      setVerify({scanner:data})
    }

    function onVerify(result)
    {
      setVerify(null)
      onComplete(result);
    }

    function onComplete(result)
    {
        // ds.close();
        setStart(false);
        if (typeof props.onComplete === "function") {
            props.onComplete(result);
        }
    }

    return (
        <div className={'middle-container'}>
            <div className={'scanner-container'} id={'scanner-container'}>

              {size != null ?
                <DeepScanner
                  host={GLOBAL_URL}
                  width={size}
                  height={size}
                  useServerSide={true}
                  onInit={ () => { onInit() } }
                  onCardDetected={(card) => { onCardDetected(card) }}
                  onCommand={(command) => { onCommand(command) }}
                  onFinished={(result) => { onFinished(result) }}
                  start={start}
                  verify={verify}
                  onVerified={(result) => { onVerify(result) }}
                  visual={{showTitle: true}}
                />
                :
                null
              }

                <div id={'anim-container'} className={'anim-container'}>
                    {showAnim ?
                        <Lottie
                            animationData={CardData}
                            loop={false}
                            autoplay={true}
                            onComplete={() => { hideAnim() }}
                        /> : null
                    }
                </div>

                <div id={'dfui-loading-wrap'} className={`dfui-loading-wrap ${isLoading ? '' : 'hidden'}`}>
                    <div className="wrap">
                        <div className="dfui-loading">
                            <div className="bounceball"> </div>
                            <div className="text">INITIALIZING</div>
                        </div>
                    </div>
                </div>

                <div className={`commands-container ${scanning ? '' : 'hidden'}`}>{text}</div>

            </div>
        </div>
    )
}

export default ScannerView;

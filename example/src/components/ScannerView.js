import React, {useState, useEffect} from "react";
import Lottie from "lottie-react";
import CardData from "../data/card.json"
import {GLOBAL_URL} from "../config"
import { ExampleComponent } from 'deepface-react'

function ScannerView(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const [text, setText] = useState('');
    const [faceID, setFaceID] = useState(null);
    const [ds, setDS] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        console.log('useEffect');
        // document.getElementById("s-cont").innerHTML = "";
        // let faceID = new DCFaceID({url:GLOBAL_URL, headers: {}});
        // setFaceID(faceID);
    }, []);

    useEffect(() => {
        // if (faceID != null) {
        //     let size = 450;
        //     let cont = document.querySelector('.middle-container');
        //     let _w = cont.offsetWidth;
        //     if (_w > 0 && _w < size) {
        //         size = _w-10;
        //     }
        //     let _ds = faceID.createDeepScan('s-cont', {
        //         width: size,
        //         height: size,
        //         mrzOptions: {server: true},
        //         camera: {fillOnMobile: true, cutEdge: true},
        //         scan_worker_path: 'js/deepscanworker.min.js',
        //         face_worker_path: 'js/deeptinyfaceworker.min.js',
        //         useServerSide: true,
        //         onInit: () => {
        //
        //         },
        //         onCardDetected: (cards) => {
        //
        //         },
        //         onCommand: (command) => {
        //             //console.log("command", command);
        //             let text = "";
        //             switch (command) {
        //                 case "none":
        //                     text = "initializing";
        //                     loading(true);
        //                     break;
        //                 case "show":
        //                     loading(false);
        //                     text = "please show Passport or ID card front side";
        //                     break;
        //                 case "id_back":
        //                     setShowAnim(true);
        //                     text = "Please show back side of ID card";
        //                     break;
        //                 case "finish":
        //                     text = "Finishing";
        //                     break;
        //                 default:
        //                     break;
        //             }
        //             //console.log("text", text);
        //             setText(text);
        //         },
        //         onFinished: (result) => {
        //             //console.log("finished", result);
        //             setResult(result);
        //         }
        //     });
        //     setDS(_ds);
        // }
    }, [faceID]);

    useEffect(() => {
        //console.log("useEffect ds", ds);
        if (ds != null) {
            if (props.start === true) {
                ds.start();
                setScanning(true);
            } else {
                //ds.stop();
                ds.close();
                setScanning(false);
                setText('');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.start, ds]);

    useEffect(() => {
        if (result != null) {
            if (result.status === true) {
                verify(result);
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
        //console.log("hideAnim");
        setShowAnim(false)
    }

    function verify(data)
    {
        faceID.verify({scanner:data}, (result) => {
            //console.log("onVerify", result);
            onComplete(result);
        });
    }

    function onComplete(result)
    {
        ds.close();
        if (typeof props.onComplete === "function") {
            props.onComplete(result);
        }
    }

    return (
        <div className={'middle-container'}>
            <div className={'scanner-container'} id={'scanner-container'}>

                <div id={'s-cont'}>

                </div>

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

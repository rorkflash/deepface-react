import React, {useState} from "react";
import ScannerView from './ScannerView';
import ResultView from './ResultView';

function MainPage() {

    const [scan, setScan] = useState(false);
    const [complete, setComplete] = useState(false);
    const [result, setResult] = useState(null);

    function newScan()
    {
        setScan(!scan);
    }

    function onComplete(result)
    {
        setScan(false);
        setComplete(true);
        setResult(result);
    }

    function startAgain()
    {
        setResult(null);
        setComplete(false);
        //setScan(true);
    }

    return (
        <div className="container">
            <div className="row">
                <div className={`uploadsContainer col-12`}>
                    <div className="uploadWrapper">
                        <div>

                            <h6>
                                Hold your Passport or ID Card in front of your device camera until full scan complete
                            </h6>
                            {!complete && result == null ?
                                <ScannerView start={scan} onComplete={(result) => { onComplete(result) }} />
                                :
                                <ResultView results={result} />
                            }

                            <div className="iconsWrap">
                                <div className="row">

                                    <div className="col-12">
                                        {!complete && result == null ?
                                            <button
                                                type='button'
                                                className={'btn btn-success'}
                                                onClick={() => { newScan() }}
                                            >
                                                {scan ? 'STOP' : 'START'}
                                            </button>
                                            :
                                            <button
                                                type='button'
                                                className={'btn btn-success'}
                                                onClick={() => { startAgain() }}
                                            >
                                                TRY AGAIN
                                            </button>
                                        }
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;

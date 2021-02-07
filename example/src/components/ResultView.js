import React, {useState, useEffect} from "react";
import moment from 'moment';

function ResultView(props) {

    const [results, setResults] = useState(null);

    useEffect(() => {
        //console.log("onProps", props);
        if (props.results != null) {
            setResults(props.results);
        } else {
            setResults(null);
        }
    }, [props]);

    function getNormalizedDate(date)
    {
        if (date) {
            return moment(date, "YYMMDD").format('MMMM Do YYYY');
        }
        return null;
    }

    return (
        <div className="container results-view">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-12">
                    {results != null ?
                        <ul className="list-group">
                            {results.success ?
                                <>
                                    <li className="list-group-item active">RESULTS</li>
                                    <li className="list-group-item">
                                        {results.data.mrz.SerialNumber || ''}
                                    </li>
                                    <li className="list-group-item">
                                        {results.data.mrz.FirstName+' '+results.data.mrz.LastName || ''}
                                    </li>
                                    <li className="list-group-item">
                                        Date of Birth: {getNormalizedDate(results.data.mrz.DateOfBirth)}
                                    </li>
                                    <li className="list-group-item">
                                        Expiration Date: {getNormalizedDate(results.data.mrz.Expiration_date)}
                                    </li>
                                    <li className="list-group-item">
                                        Nationality: {results.data.mrz.Nationality || ''}
                                    </li>
                                    <li className="list-group-item">
                                        Country: {results.data.mrz.Country || ''}
                                    </li>
                                    <li className="list-group-item">
                                        Sex: {results.data.mrz.Sex === "F" ? "Female" : "Male"}
                                    </li>
                                    <li className="list-group-item">
                                        Document Type: {results.data.mrz.Type === "I<" ?
                                        "ID" : results.data.mrz.Type === "P<" ? "Passport" : "Undefined"}
                                    </li>
                                    {results.data.mrz.Type === "P<" && results.data.mrz.SerialNumber[0] === "B" ?
                                        <li className="list-group-item">Biometric</li>
                                        : null
                                    }
                                </>
                                :
                                <>
                                    <li className="list-group-item list-group-item-warning">
                                        FINISHED WITH ERRORS
                                    </li>
                                    <li className="list-group-item">
                                        {results.msg ? results.msg : ''}
                                    </li>
                                </>
                            }
                        </ul>
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ResultView;

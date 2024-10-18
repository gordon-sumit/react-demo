import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";
import {useState, useRef, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition/lib';


export default function ({setSearch}) {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    useEffect(() => {
        setSearch(transcript);
    }, [transcript])


    const onStart = () => {
        resetTranscript();
        SpeechRecognition.startListening({continuous: true})
    }

    const onStop = () => {
        SpeechRecognition.stopListening()
    }

    return (
        <div className="microphone-wrapper">
            <div className="microphone"
                 onTouchStart={onStart}
                 onMouseDown={onStart}
                 onTouchEnd={onStop}
                 onMouseUp={onStop}
            >
                <div className={`microphone-icon ${listening ? 'listening' : ''}`}>
                    <FontAwesomeIcon icon={faMicrophone} className="icon-mic"/>
                </div>
            </div>
        </div>
    );
}

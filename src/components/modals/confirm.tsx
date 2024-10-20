import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ({message, defaultValue, options, onYesClick, onCancelClick, onOptionUpdate}) {

    return <div className="confirm-dialog-wrapper">
        <div className="confirm-box">
            <div className={`title ${options ? 'mb-0' : ''}`}>{message}</div>
            {options &&
                <div className="options mb-3">
                    <ul className="options-group">
                        {options.map((item) =>
                            <li className="">
                                <input type="radio" checked={defaultValue === item.value}
                                       onClick={() => onOptionUpdate(item.value)} name="type" id={item.value}/>
                                <label
                                    htmlFor={item.value}><FontAwesomeIcon icon={item.icon}/></label>
                            </li>
                        )}
                    </ul>
                </div>
            }
            <div className="button-group">
                <button className="btn btn-danger"
                        onClick={onYesClick}>
                    Yes
                </button>
                <button className="btn btn-outline-secondary" onClick={onCancelClick}>No</button>
            </div>
        </div>
    </div>
}
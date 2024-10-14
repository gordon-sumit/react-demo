export default function ({message, options, onYesClick, onCancelClick, onOptionUpdate}) {

    return <div className="confirm-dialog-wrapper">
        <div className="confirm-box">
            <div className={`title ${options ? 'mb-0' : ''}`}>{message}</div>
            {options &&
                <div className="options mb-3">
                    <ul className="options-group">
                        <li className="">
                            <input type="radio" onClick={() => onOptionUpdate('Rs')} name="type" id="rs"/>
                            <label
                                htmlFor="rs">Price</label>
                        </li>
                        <li className="">
                            <input type="radio" onClick={() => onOptionUpdate('gm')} name="type" id="gm"/>
                            <label
                                htmlFor="gm">Quantity</label>
                        </li>
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
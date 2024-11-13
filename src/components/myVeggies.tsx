import {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myVegetableActions, myVegetables, removeItemFromDefault} from "../store/actions/myVegetable.actions";
import AddVeggies from "./addVeggies";
import {addItemToBucket, emptyBucket, reduceBucketItemQty, removeItemFromBucket} from "../store/reducer/vegetable";
import Loader from "./loader";
import withReactContent from "sweetalert2-react-content";
import Sweetalert2 from "sweetalert2";
import Pagination from "./pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faIndianRupeeSign,
    faMagnifyingGlass,
    faMicrophone,
    faRupee,
    faScaleBalanced,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Confirm from "./modals/confirm";
import AudioComponent from "./AudioComponent";
import {faSlack, faWhatsapp} from "@fortawesome/free-brands-svg-icons";

export default function () {
    const {
        allVegetables,
        currentPage,
        totalPages,
        myBucket,
        message,
        loading
    } = useSelector(state => state.root.Vegetable);

    const dispatch = useDispatch();
    const [tempDropItem, setTempDropItem] = useState(null);
    const [isDragging, setDragging] = useState(false);
    const [show, setShow] = useState('');
    const [qtyType, setQtyType] = useState('gm');
    const [sendOption, setSendOption] = useState('whatsapp');
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('desc');
    const isMediaLoaded = useRef(false);

    const onAddVegetableItem = (item) => {
        const itemExists = myBucket.find(bucketItem => bucketItem.id === item.id);
        if (itemExists) {
            const temp = {...item};
            temp.qtyType = itemExists.qtyType;
            dispatch(addItemToBucket({item: temp, direct: false}));
        } else {
            setTempDropItem(item);
            setShow('addOption')
        }
    }

    const onConfirmAdd = (item, setShow) => {
        setShow();
        const temp = {...item};
        temp.qtyType = qtyType;
        dispatch(addItemToBucket({item: temp, direct: false}));
    }

    const onConfirmSend = (setShow) => {
        setShow();
        dispatch(myVegetableActions({myData: myBucket, sendType: sendOption}))
    }
    const removeVegetable = (item) => {
        dispatch(reduceBucketItemQty(item))
    }

    const removeVegetableItem = (item) => {
        dispatch(removeItemFromBucket(item))
    }

    const onConfirmDelete = (id, setShow) => {
        setShow();
        dispatch(removeItemFromDefault(id))
    }
    const dragStart = (item) => {
        setTempDropItem(item);
        // setDragging(true)
    }

    const dragEnd = () => {
        dispatch(addItemToBucket({item: tempDropItem, direct: false}))
        setTempDropItem(null)
        setDragging(false)
    }

    useEffect(() => {
        if (message) {
            withReactContent(Sweetalert2).fire({
                position: 'bottom-end',
                icon: "success",
                title: message,
                showConfirmButton: false,
                key: "", props: undefined, type: undefined,
                timer: 2000
            })
            setShow('')
        }
    }, [message])

    useEffect(() => {
        if(!isMediaLoaded.current){
            isMediaLoaded.current = true;
            dispatch(myVegetables({page: 1, order, search}))
        }
    }, [order, search]);

    const paginate = (page) => {
        dispatch(myVegetables({page, order, search: search}))
    }
    const onSearch = (val) => {
        setSearch(val);
        dispatch(myVegetables({page: 1, order, search: val}))
    }

    const emptyBuckets = () => {
        dispatch(emptyBucket())
    }

    const showConfirmBox = (item) => {
        setTempDropItem(item);
        setShow('confirmDelete')
    }

    const onQtyChange = (qty, item) => {
        if (qty < 1) return false;
        const tempItem = {...item};
        tempItem.qty = parseFloat(qty);
        dispatch(addItemToBucket({item: tempItem, direct: true}))
    }

    return <div className="my-vegetables-wrapper">
        <div className="row mb-4 text-center ">
            <div className="send-info">
                <button
                    disabled={!myBucket.length}
                    className="border btn btn-info text-bg-dark"
                    onClick={() => setShow('sendOption')}>
                    Send Bucket Info
                </button>
                <button
                    className="border btn btn-info text-bg-dark"
                    onClick={() => setShow('addForm')}>
                    Add New
                </button>
                <AudioComponent setSearch={(val) => setSearch(val)}/>
            </div>
        </div>
        <div className="row">
            <div className="input-group mb-3 search-wrapper">
                <div className="input-group-prepend position-relative">
                    <span className="input-group-search-icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
                </div>
                <input type="text" value={search} className="form-control" onChange={(e) => onSearch(e.target.value)}
                       aria-label="Amount (to the nearest dollar)"/>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 position-relative" style={loading ? {height: '450px'} : {}}>
                <div className="header-bar">
                    <h4>All Vegetables</h4>
                    <select id="orderBy" onChange={(e) => setOrder(e.target.value)}
                            className="form-control">
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                    </select>
                </div>
                {loading && <Loader/>}
                <ul className="list-group default-lists mt-4">
                    {
                        !loading && allVegetables.map((item, index) => {
                            return <li draggable={true} onDragStart={() => dragStart(item)} key={index}
                                       className="list-group-item ">
                                <div className="thumbnail">
                                    <img src={item.singedUrl}
                                         onClick={() => onAddVegetableItem(item)}
                                         alt={item.name}/>
                                </div>
                                <div className="title"
                                     onClick={() => onAddVegetableItem(item)}>{item.name}</div>
                                <div className="veg-trash-icon" onClick={() => showConfirmBox(item)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="col-lg-6" onDragLeave={() => setDragging(false)} onDragEnter={() => setDragging(true)}
                 onDrop={dragEnd} onDragOver={(e) => e.preventDefault()}>
                {myBucket.length ?
                    <Fragment>
                        <div className="title-wrapper">
                            <h4>My Bucket</h4>
                            <button className="btn btn-outline-danger" onClick={emptyBuckets}>Empty
                                Bucket <FontAwesomeIcon icon={faTrashAlt}/></button>
                        </div>
                        <ul className="list-group mt-3"
                            style={myBucket.length > 10 ? {overflowY: 'scroll', maxHeight: '1160px'} : {}}>
                            {
                                myBucket.map((item, index) => {
                                    return <li key={index} className="list-group-item position-relative">
                                        <div className="thumbnail">
                                            <img src={item.singedUrl}
                                                 alt=""/>
                                        </div>
                                        <div className="title">{item.name}</div>
                                        <ul className="qty-wrapper">
                                            <li className="qty-btn" onClick={() => removeVegetable(item)}>-</li>
                                            <li className="qty-input-wrapper">
                                                <input type="text"
                                                       className={`${show === 'input' ? 'd-block' : ''} qty-input`}
                                                       value={item.qty > 950 && item.qtyType !== 'Rs' ? item.qty / 1000 : item.qty}
                                                       onChange={(e) => onQtyChange(e.target.value, item)}/>
                                                <strong> {item.qtyType}</strong>
                                            </li>
                                            <li className="qty-btn"
                                                onClick={() => dispatch(addItemToBucket({item, direct: false}))}>+
                                            </li>
                                        </ul>
                                        <div className="veg-trash-icon" onClick={() => removeVegetableItem(item)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/></div>
                                    </li>
                                })
                            }
                            <li className={`list-group-item ${isDragging ? 'dragging' : 'd-none'}`}><span>+</span></li>
                        </ul>
                    </Fragment> :
                    <div className="drag-area">
                        <div className="drag-text">
                            {isDragging ? 'Dragging...' : 'Drag Here'}
                        </div>
                    </div>
                }
            </div>

        </div>
        <div className="row">
            <Pagination totalPages={totalPages} currentPage={currentPage} paginate={(page) => paginate(page)}/>
        </div>
        <AddVeggies show={show === 'addForm'} setShow={() => setShow('')}/>
        {show === 'confirmDelete'
            &&
            <Confirm
                message={'Are you sure you want to delete this item?'}
                onYesClick={() => onConfirmDelete(tempDropItem.id, () => setShow(''))}
                onCancelClick={() => setShow('')}
            />
        }

        {
            show === 'addOption'
            &&
            <Confirm
                message={'Please select the option.'}
                defaultValue={qtyType}
                options={[{name: 'Price', value: 'Rs', icon: faIndianRupeeSign}, {
                    name: 'Quantity',
                    value: 'gm',
                    icon: faScaleBalanced
                }]}
                onYesClick={() => onConfirmAdd(tempDropItem, () => setShow(''))}
                onCancelClick={() => setShow('')}
                onOptionUpdate={(option) => setQtyType(option)}
            />
        }

        {
            show === 'sendOption'
            &&
            <Confirm
                message={'Please select the send options.'}
                defaultValue={sendOption}
                options={[
                    {name: 'WhatsApp', value: 'whatsapp', icon: faWhatsapp},
                    {name: 'Slack', value: 'slack', icon: faSlack},
                    {name: 'Mail', value: 'mail', icon: faEnvelope}
                ]}
                onYesClick={() => onConfirmSend(() => setShow(''))}
                onCancelClick={() => setShow('')}
                onOptionUpdate={(option) => setSendOption(option)}
            />
        }
    </div>
}
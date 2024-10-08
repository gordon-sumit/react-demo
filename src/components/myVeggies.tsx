import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myVegetableActions, myVegetables, removeItemFromDefault} from "../store/actions/myVegetable.actions";
import AddVeggies from "./addVeggies";
import {addItemToBucket, emptyBucket, reduceBucketItemQty, removeItemFromBucket} from "../store/reducer/vegetable";
import Loader from "./loader";
import withReactContent from "sweetalert2-react-content";
import Sweetalert2 from "sweetalert2";
import Pagination from "./pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

export default function () {
    const {
        allVegetables,
        currentPage,
        totalPages,
        myBucket,
        message,
        loading
    } = useSelector(state => state.root.Vegetable)
    const [tempDropItem, setTempDropItem] = useState(null);
    const [isDragging, setDragging] = useState(false);
    const [show, setShow] = useState('');
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const removeVegetable = (item) => {
        dispatch(reduceBucketItemQty(item))
    }

    const removeVegetableItem = (item) => {
        dispatch(removeItemFromBucket(item))
    }

    const removeVegetableItemFromDefault = (id, setShow) => {
        setShow();
        dispatch(removeItemFromDefault(id))
    }
    const dragStart = (item) => {
        setTempDropItem(item);
        setDragging(true)
    }

    const dragEnd = () => {
        dispatch(addItemToBucket(tempDropItem))
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
        dispatch(myVegetables({page: 1}))
    }, []);

    const paginate = (page) => {
        dispatch(myVegetables({page, search: search}))
    }
    const onSearch = (val) => {
        setSearch(val);
        dispatch(myVegetables({page: 1, search: val}))
    }

    const emptyBuckets = () => {
        dispatch(emptyBucket())
    }

    const showConfirmBox = (item) => {
        setTempDropItem(item);
        setShow('confirm')
    }

    return <div className="my-vegetables-wrapper">
        <div className="row mb-4 text-center ">
            <div className="send-info">
                <button
                    className="border btn btn-info text-bg-dark"
                    onClick={() => dispatch(myVegetableActions(myBucket))}>
                    Send Bucket Info
                </button>
                <button
                    className="border btn btn-info text-bg-dark"
                    onClick={() => setShow('addForm')}>
                    Add New
                </button>
            </div>
        </div>
        <div className="row">
            <div className="input-group mb-3 search-wrapper">
                <div className="input-group-prepend position-relative">
                    <span className="input-group-search-icon"><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
                </div>
                <input type="text" className="form-control" onChange={(e) => onSearch(e.target.value)}
                       aria-label="Amount (to the nearest dollar)"/>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 position-relative" style={loading ? {height: '450px'} : {}}>
                <h4>All Vegetables</h4>
                {loading && <Loader/>}
                <ul className="list-group default-lists mt-4">
                    {
                        !loading && allVegetables.map((item, index) => {
                            return <li draggable={true} onDragStart={() => dragStart(item)} key={index}
                                       className="list-group-item">
                                <div className="thumbnail">
                                    <img src={item.thumbnail} onClick={() => dispatch(addItemToBucket(item))}
                                         alt={item.name}/>
                                </div>
                                <div className="title" onClick={() => dispatch(addItemToBucket(item))}>{item.name}</div>
                                <div className="veg-trash-icon" onClick={() => showConfirmBox(item)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="col-lg-6" onDrop={dragEnd} onDragOver={(e) => e.preventDefault()}>
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
                                            <img src={item.thumbnail}
                                                 alt=""/>
                                        </div>
                                        <div className="title">{item.name}</div>
                                        <div className="qty-wrapper">
                                            <button onClick={() => removeVegetable(item)}>-</button>
                                            <div>
                                                {item.qty > 750 ? item.qty / 1000 : item.qty}<strong> {item.qtyType}</strong>
                                            </div>
                                            <button onClick={() => dispatch(addItemToBucket(item))}>+</button>
                                        </div>
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
        {show === 'confirm' &&
            <div className="confirm-dialog-wrapper">
                <div className="confirm-box">
                    <div className="title">Are you sure you want to delete this item?</div>
                    <div className="button-group">
                        <button className="btn btn-danger"
                                onClick={() => removeVegetableItemFromDefault(tempDropItem.id, () => setShow(''))}>Yes
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => setShow('')}>No</button>
                    </div>
                </div>
            </div>
        }
    </div>
}
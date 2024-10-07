import {useEffect, useState} from "react";
import {DndProvider, useDrag} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {myVegetableActions, myVegetables} from "../store/actions/myVegetable.actions";
import {i} from "vite/dist/node/types.d-aGj9QkWt";
import AddVeggies from "./addVeggies";
import {addItemToBucket, removeItemFromBucket} from "../store/reducer/vegetable";
import Loader from "./loader";
import withReactContent from "sweetalert2-react-content";
import Sweetalert2 from "sweetalert2";
import Pagination from "./pagination";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

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
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const removeVegetable = (item) => {
        dispatch(removeItemFromBucket(item))
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
            setShow(false)
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
        dispatch(myVegetables({page: currentPage, search: val}))
    }

    return <div className="my-vegetables-wrapper">
        <div className="row mb-4 text-center ">
            <div className="send-info">
                <button
                    className="border btn btn-info text-bg-dark"
                    onClick={() => dispatch(myVegetableActions(myBucket))}>
                    Send Message
                </button>
                <button
                    className="border btn btn-info text-bg-dark"
                    onClick={() => setShow(true)}>
                    Add New
                </button>
            </div>
        </div>
        <div className="row">
            <div className="input-group mb-3 search-wrapper">
                <div className="input-group-prepend position-relative">
                    <span className="input-group-search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                </div>
                <input type="text" className="form-control" onChange={(e) => onSearch(e.target.value)}
                       aria-label="Amount (to the nearest dollar)"/>
            </div>
        </div>
        <div className="row">
            <h2>All Vegetables</h2>
            <div className="col-lg-6 position-relative" style={loading ? {height: '450px'} : {}}>
                {loading && <Loader/>}
                <ul className="list-group">
                    {
                        allVegetables.map((item, index) => {
                            return <li draggable={true} onDragStart={() => dragStart(item)} key={index}
                                       className="list-group-item">
                                <div className="thumbnail">
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.thumbnail}`}
                                         alt={item.name}/>
                                </div>
                                <div className="title">{item.name}</div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="col-6" onDrop={dragEnd} onDragOver={(e) => e.preventDefault()}>
                {myBucket.length ?
                    <div>
                        <h2>My Bucket</h2>
                        <ul className="list-group">
                            {
                                myBucket.map((item, index) => {
                                    const bucket = allVegetables.find(bucketItem => bucketItem.id === item.id);
                                    return <li key={index} className="list-group-item">
                                        <div className="thumbnail">
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.thumbnail}`}
                                                 alt=""/>
                                        </div>
                                        <div className="title">{item.name}</div>
                                        <div className="qty-wrapper">
                                            <button onClick={() => dispatch(addItemToBucket(item))}>+</button>
                                            <div>{item.qty > 750 ? item.qty / 1000 : item.qty}<strong> {item.qtyType}</strong>
                                            </div>
                                            <button onClick={() => removeVegetable(item)}>-</button>
                                        </div>
                                    </li>
                                })
                            }
                            <li className={`list-group-item ${isDragging ? 'dragging' : 'd-none'}`}><span>+</span></li>
                        </ul>
                    </div> :
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
        <AddVeggies show={show} setShow={() => setShow(false)}/>

    </div>
}
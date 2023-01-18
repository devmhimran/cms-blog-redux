import React, { useEffect, useState } from 'react';
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { pageCountNum } from '../../Redux/actionCreators/actionCreators';

const Pagination = () => {
    const [count, setCount] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [previousDisable, setPreviousDisable] = useState(false)
    const [nextDisable, setNextDisable] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('http://localhost:5000/page-count')
            .then(res => res.json())
            .then(data => {
                const count = data.count
                const pages = Math.ceil(count / 6)
                setPageCount(pages)
            })
    }, [])
    
    const { pageNum } = useSelector(state => state.blog)
    const btnEnable = 'bg-black text-white'
    const handlePrevious = () => {
        const counting = count - 1;
        setCount(counting)
        const num = 1
        if (counting === num) {
            setNextDisable(false)
            setPreviousDisable(true)
        }

    }
    const handleNext = () => {
        const counting = count + 1
        setCount(counting)
        if (counting === pageCount) {
            setNextDisable(true)
            setPreviousDisable(false)
        }
    }
    useEffect(() => {
        dispatch(pageCountNum(count))
    }, [count])
    console.log(count)
    return (
        <div className="pagination flex justify-between pt-16">
            <button disabled={count === 1 ? true : previousDisable} onClick={handlePrevious} className={`${count === 1 ? 'cursor-not-allowed text-gray-400' : previousDisable ? 'cursor-not-allowed text-gray-400' : btnEnable} py-1.5 px-4 border text-lg rounded-full flex items-center gap-2`}><span><HiOutlineArrowLongLeft /></span> Previous</button>
            <p>{count}/{pageCount}</p>
            <button disabled={nextDisable} onClick={handleNext} className={`${nextDisable ? 'cursor-not-allowed text-gray-400' : btnEnable} py-1.5 px-4 border text-lg rounded-full flex items-center gap-2`}>Next <span><HiOutlineArrowLongRight /></span> </button>
        </div>
    );
};

export default Pagination;
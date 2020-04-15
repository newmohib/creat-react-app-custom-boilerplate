import React, { useEffect } from 'react';
import _ from 'lodash';

function Pagination(props) {

    useEffect(
        () => {
            let { pageInfo } = props;
            let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            let pages = _.range(1, pagesCount + 1);

            let allPages = createPageList(pageInfo.currentPage, pagesCount);
            // let allPages =createPageList( pageInfo.currentPage, 300);
            let paginationList = [...pageInfo.paginationList];

            if (pages.length < paginationList.length) {
                paginationList = pages
            } else {
                let newPaginationList = [];
                for (let i = 0; i < paginationList.length; i++) {
                    let element = pages[i];
                    newPaginationList.push(element);
                }
                paginationList = newPaginationList;
            }
            let isPrevious = Number(pageInfo.currentPage) == 1 ? "disabled" : "";
            let isNext = Number(pageInfo.currentPage) == pagesCount ? "disabled" : "";
            props.setPageInfo({ ...pageInfo, pagesCount, pages: allPages, paginationList, isPrevious, isNext });

        }, [props.pageInfo.totalCount]
    );


    const getPager = (totalItems, currentPage, pageSize, paginationList) => {
        let middleCeilIndex = Math.ceil(paginationList.length / 2);
        let middleFloorIndex = Math.floor(paginationList.length / 2);
        let remainingMeddleIndex = paginationList.length - middleCeilIndex;
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= paginationList.length) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= middleCeilIndex) {
                startPage = 1;
                endPage = paginationList.length;
            } else if (currentPage + remainingMeddleIndex >= totalPages) {
                startPage = totalPages - (paginationList.length - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - middleFloorIndex;
                endPage = currentPage + middleFloorIndex - 1;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        var pages = _.range(startPage, endPage + 1);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    const createPageList = (currentPage, pageCount) => {
        let total = 50;
        currentPage = Number(currentPage);
        pageCount = Number(pageCount);

        let incrementTo = currentPage + total >= pageCount ? pageCount : currentPage + total;
        let increment = _.range(currentPage + 1, incrementTo + 1);
        let decrementTo = total > increment[0] ? increment[0] - 1 : pageCount <= total ? pageCount : total;
        let decrement = _.range(currentPage - decrementTo + 1, currentPage + 1);

        let incrementDecrement = [...decrement, ...increment];
        let lastElemnet = incrementDecrement.slice(-1)[0];
        let newIncrementDecrement = [];

        if (decrement.length < increment.length && lastElemnet <= pageCount && (total * 2) <= pageCount) {
            let remainingIncrementTotal = (total * 2) - incrementDecrement.length;
            let remainingIncrement = _.range(lastElemnet + 1, incrementDecrement.length + remainingIncrementTotal + 1);
            newIncrementDecrement = [...incrementDecrement, ...remainingIncrement];
        }
        else if (decrement.length === increment.length && lastElemnet <= pageCount && (total * 2) <= pageCount) {
            newIncrementDecrement = [...incrementDecrement];
        }
        else if (decrement.length > increment.length && increment.length < total && (total * 2) <= pageCount) {
            let remainingDecrementTotal = total - increment.length;
            let remainingDecrement = _.range(currentPage - remainingDecrementTotal - total, currentPage);
            newIncrementDecrement = [...remainingDecrement, ...increment];
        }
        // else if(currentPage === pageCount){
        //     decrement = _.range(currentPage - decrementTo + 1, currentPage+1);
        // }
        else {
            newIncrementDecrement = [...incrementDecrement];
        }
        return newIncrementDecrement
    }

    const pageChange = (newCurrentPage) => {

        let { pageInfo } = props
        let { currentPage, totalPages, pages } = getPager(pageInfo.totalCount, newCurrentPage, pageInfo.pageSize, pageInfo.paginationList);
        currentPage = Number(currentPage)
        // let allPages = _.range(1, pageInfo.pagesCount + 1);
        //let allPages =createPageList(newCurrentPage, 300);
        let allPages = createPageList(newCurrentPage, pageInfo.pagesCount);
        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === totalPages ? "disabled" : "";

        props.setPageInfo({ ...pageInfo, pagesCount: totalPages, pages: allPages, paginationList: pages, isPrevious, isNext, currentPage });
    }

    const pageSizeChange = ({ currentTarget: input }) => {
        let { pageInfo } = props
        let newPageSize = input.value;
        let { currentPage, pageSize, totalPages, pages } = getPager(pageInfo.totalCount, pageInfo.currentPage, newPageSize, pageInfo.paginationList);
        currentPage= currentPage > totalPages ? totalPages: currentPage
        let allPages = _.range(1, totalPages + 1);
        props.setPageInfo({ ...pageInfo, pagesCount: totalPages, pages: allPages, paginationList: pages, currentPage, pageSize });
    }

    return (

        <div className="container-fluid mt-2">
            <div className="row" >
                <div className="col px-0 mb-2 mr-1 order-1 order-md-0">
                    <div>
                        <button disabled={props.pageInfo.isPrevious} style={{ backgroundColor: "#F0EFEF", color: "black", border: "none" }} onClick={() => pageChange(props.pageInfo.currentPage - 1)} className={`btn btn-light btn-block btn-lg`}><span>Previous</span></button>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-auto mr-auto ml-auto my-auto order-0 px-md-0">
                    <div className="container-fluid px-0">
                        <div className="row text-center ml-n4 mr-n4 ml-md-1 mr-md-1 ">
                            <div className="col-4 col-sm-4 col-md-5 pl-2">
                                <select
                                   
                                    className="form-control mb-2 px-1"
                                    onChange={pageSizeChange} >

                                    {props.pageInfo.pageSizeList.map((item, index) => {
                                        let newItem = item < 10 ? `0${item} rows` : `${item} rows`;
                                        return (
                                            <option
                                                key={index + 40}
                                                value={item}
                                            >{newItem}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-2 col-sm-2 col-md-1 mt-2 ">
                                <span className="mb-3 mr-n5 mr-md-1">Page</span>
                            </div>
                            <div className="col-4 col-sm-4 col-md-auto  ml-md-3  pl-3 pr-2 mr-md-2 ">
                                <select
                                    value={props.pageInfo.currentPage}
                                    className="form-control mb-2 "
                                    onChange={({ currentTarget }) => pageChange(currentTarget.value)} >
                                    {props.pageInfo.pages.map((item, index) => {
                                        let newItem = item < 10 ? `0${item}` : `${item}`;
                                        return (
                                            <option
                                                key={index + 50}
                                                value={item}
                                            >{newItem}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-2 col-sm-2 col-md-auto  pr-0 mt-2 ml-n4 ">
                                <span className="mb-3 ">of {props.pageInfo.pagesCount < 10000 ? props.pageInfo.pagesCount : 9999 + '+'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col px-0 order-2 order-md-last mb-2 ml-1">
                    <button disabled={props.pageInfo.isNext} style={{ backgroundColor: "#F0EFEF", color: "black", border: "none" }} onClick={() => pageChange(props.pageInfo.currentPage + 1)} className={`btn btn-light btn-block btn-lg`}><span>Next</span></button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
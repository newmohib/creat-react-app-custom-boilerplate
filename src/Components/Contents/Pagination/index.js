import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function Pagination(props) {

    useEffect(
        () => {
            let { pageInfo, setPageInfo } = props;
            let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            let pages = _.range(1, pagesCount + 1);

            let paginationList = [...pageInfo.paginationList];

            if (pages.length < paginationList.length) {
                paginationList = pages
            } else {
                console.log("paginationList", pages, paginationList.length);
                let newPaginationList = [];
                for (let i = 0; i < paginationList.length; i++) {
                    let element = pages[i];

                    console.log("element", element);
                    newPaginationList.push(element);
                }
                paginationList = newPaginationList;
            }
            let isPrevious = pageInfo.currentPage === 1 ? "disabled" : "";
            let isNext = pageInfo.currentPage === pagesCount ? "disabled" : "";
            props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext });

        }, [props.pageInfo.totalCount]
    );

    

    const GetPager = (totalItems, currentPage, pageSize) =>   {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10; // paginationList.length
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;

    // create an array of pages to ng-repeat in the pager control
    var pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
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

    const pageChangeFixed=(newCurrentPage)=>{
       
        let { pageInfo, setPageInfo } = props

       let {totalItems,currentPage ,pageSize, totalPages, startPage, endPage, startIndex,endIndex,pages }= GetPager(pageInfo.totalCount, newCurrentPage, pageInfo.pageSize);

        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === totalPages ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount:totalPages, pages, paginationList:pages, isPrevious, isNext, currentPage});
    }



    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-3">
                    <li className={`page-item ${props.pageInfo.isPrevious}`} >
                        <a onClick={() => pageChangeFixed(props.pageInfo.currentPage - 1)} className="page-link px-4" >Previous</a>
                    </li>
                    {
                        props.pageInfo.paginationList.map((item, index) => {
                            return (<li key={index + 20} className="page-item">
                                <a onClick={() => pageChangeFixed(item)} className="page-link px-4">{item}</a>
                            </li>)
                        })
                    }
                    <li className={`page-item ${props.pageInfo.isNext}`}>
                        <a onClick={() => pageChangeFixed(props.pageInfo.currentPage + 1)} className="page-link px-4" >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
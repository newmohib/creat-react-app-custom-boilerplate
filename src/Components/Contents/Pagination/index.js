import React, { useEffect } from 'react';
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
                let newPaginationList = [];
                for (let i = 0; i < paginationList.length; i++) {
                    let element = pages[i];
                    newPaginationList.push(element);
                }
                paginationList = newPaginationList;
            }
            let isPrevious = pageInfo.currentPage === 1 ? "disabled" : "";
            let isNext = pageInfo.currentPage === pagesCount ? "disabled" : "";
            props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext });

        }, [props.pageInfo.totalCount]
    );


    const getPager = (totalItems, currentPage, pageSize, paginationList) => {
        // let paginationList=[1,2,3,4,5,6,7,8,9,10];
        let middleCeilIndex = Math.ceil(paginationList.length / 2);
        let middleFloorIndex = Math.floor(paginationList.length / 2);
        let remainingMeddleIndex = paginationList.length - middleCeilIndex;
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 10;
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= paginationList.length) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
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

    const pageChange = (newCurrentPage) => {

        let { pageInfo, setPageInfo } = props
        let { totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages } = getPager(pageInfo.totalCount, newCurrentPage, pageInfo.pageSize, pageInfo.paginationList);

        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === totalPages ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount: totalPages, pages, paginationList: pages, isPrevious, isNext, currentPage });
    }

    return (

        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-3">
                    <li className={`page-item ${props.pageInfo.isPrevious}`} >
                        <a onClick={() => pageChange(props.pageInfo.currentPage - 1)} className="page-link px-4" >Previous</a>
                    </li>
                    {
                        props.pageInfo.paginationList.map((item, index) => {
                            return (<li key={index + 20} className="page-item">
                                <a onClick={() => pageChange(item)} className="page-link px-4">{item}</a>
                            </li>)
                        })
                    }
                    <li className={`page-item ${props.pageInfo.isNext}`}>
                        <a onClick={() => pageChange(props.pageInfo.currentPage + 1)} className="page-link px-4" >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function Pagination(props) {

    useEffect(
        () => {
            let {pageInfo, setPageInfo}=props;
            let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            let pages = _.range(1, pagesCount + 1);

            let paginationList = [...pageInfo.paginationList];
            
            if (pagesCount > 2 && pagesCount > pageInfo.currentPage + 2) {
                paginationList = [pageInfo.currentPage + 1, pageInfo.currentPage + 2, pageInfo.currentPage + 3];
            } else if (pagesCount <= 3 || pageInfo.currentPage < 2) {
                paginationList = pagesCount <= 1 ? [1] : pagesCount ===2? [2]:[2,3];
            }


            let isPrevious = pageInfo.currentPage === 1 ? "disabled" : "";
            let isNext = pageInfo.currentPage === pagesCount ? "disabled" : "";
            props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext });

        },[props.pageInfo.totalCount]
    );

    const pageChange = (currentPage => {
         let {pageInfo, setPageInfo}=props
            let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            let pages = _.range(1, pagesCount + 1);
        
         let paginationList = [...pageInfo.paginationList];

        if (pagesCount > 2 && pagesCount > currentPage + 2) {
            paginationList = [currentPage + 1, currentPage + 2, currentPage + 3];
        } else if (pagesCount <= 2 || currentPage < 2) {
            paginationList = pagesCount <= 1 ? [1] : [2];
        }
        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === pagesCount ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext,currentPage: currentPage });
    })

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
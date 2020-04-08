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

    const pageChange = (currentPage => {

        let { pageInfo, setPageInfo } = props
        let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
        let pages = _.range(1, pagesCount + 1);
        let paginationList = [...pageInfo.paginationList];
        let listChangeIndex = Math.floor(paginationList.length / 2);

        if (pages.length < paginationList.length) {
            paginationList = pages;
        } else if (pages.length > paginationList.length && (currentPage + paginationList.length - listChangeIndex) <= pagesCount) {

            let newPaginationList = [];
            for (let i = 0; i < paginationList.length; i++) {
                if (currentPage <= pageInfo.totalCount && currentPage >= paginationList[listChangeIndex]) {
                    let element = paginationList[i] + 1;
                    newPaginationList.push(element);
                } else {
                    newPaginationList = paginationList
                }
            }
            paginationList = newPaginationList;
        }

        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === pagesCount ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext, currentPage: currentPage });
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
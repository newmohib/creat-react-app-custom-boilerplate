import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Pagination, Filter } from '../index'
import ChieldUserTable from './chieldTable'

let Users = (props) => {
    let [isDesplay, setIsDesplay] = useState(null);
    let [pageInfo, setPageInfo] = useState({ pageSize: 2, totalCount: 0, currentPage: 1, pagesCount: 0, pages: [], paginationList: [1, 2, 3, 4, 5, 6], isPrevious: "", isNext: "", pageSizeList: [2, 10, 20, 30, 50], paginationType: "dropdown" }); // dropdown / list
    let [data, setData] = useState({ dataList: [], fromDataIndex: 0, toDataIndex: pageInfo.pageSize });
    let [filterInfo, setFilterInfo] = useState({ search: "", id: "", firstName: "", email: "", country: "allCountry" });
    let [chieldData, setChieldData] = useState({});

    let viewDetails = (index, item) => {
        if (isDesplay === index) {
            setIsDesplay(null);
            setChieldData({})
        } else {
            setIsDesplay(index);
            setChieldData(item)
        }
    };

    let getAllData = (fromDataIndex, toDataIndex) => {
        //here start server side paginatin with filter then get the data
        let dataList = [
            { id: 1, firstName: "Mohib1", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 2, firstName: "Mohib2", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 3, firstName: "Mohib3", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 4, firstName: "Mohib4", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 5, firstName: "Mohib5", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 6, firstName: "Mohib6", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 7, firstName: "Mohib7", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 8, firstName: "Mohib8", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 9, firstName: "Mohib9", lastName: "Rahman", email: "mohib@gmail.com", country: "Bangladesh" },
            { id: 10, firstName: "Mohib10", lastName: "Rahman", email: "mohib@gmail.com", country: "India" },
            { id: 11, firstName: "Mohib11", lastName: "Rahman", email: "mohib@gmail.com", country: "India" },
            { id: 12, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com", country: "India" },
            { id: 13, firstName: "Mohib13", lastName: "Rahman", email: "mohib@gmail.com", country: "India" },
            { id: 14, firstName: "Mohib14", lastName: "Rahman", email: "mohib@gmail.com", country: "Pakistan" },
            { id: 15, firstName: "Mohib15", lastName: "Rahman", email: "mohib@gmail.com", country: "Pakistan" },
            { id: 16, firstName: "Mohib16", lastName: "Rahman", email: "mohib@gmail.com", country: "Pakistan" },
            { id: 17, firstName: "Mohib17", lastName: "Rahman", email: "mohib@gmail.com", country: "Germany" },
            { id: 18, firstName: "Mohib18", lastName: "Rahman", email: "mohib@gmail.com", country: "Germany" },
            { id: 19, firstName: "Mohib19", lastName: "Rahman", email: "mohib@gmail.com", country: "Germany" },
            { id: 20, firstName: "Mohib20", lastName: "Rahman", email: "mohib@gmail.com", country: "Italy" },
            { id: 21, firstName: "Mohib21", lastName: "Rahman", email: "mohib@gmail.com", country: "Italy" },
            { id: 22, firstName: "Mohib22", lastName: "Rahman", email: "mohib@gmail.com", country: "Italy" },
            { id: 23, firstName: "Mohib23", lastName: "Rahman", email: "mohib@gmail.com", country: "France" },
            { id: 24, firstName: "Mohib24", lastName: "Rahman", email: "mohib@gmail.com", country: "France" },
            { id: 25, firstName: "Mohib25", lastName: "Rahman", email: "mohib@gmail.com", country: "France" },
            { id: 26, firstName: "Mohib26", lastName: "Rahman", email: "mohib@gmail.com", country: "France" },
        ];
        //optional : there is client site filter

        var newData = dataList.filter((item) => {
            if (filterInfo.search !== "") {
                let isId = String(item.id).includes(String(filterInfo.search));
                let isFirstName = item.firstName.toLowerCase().includes(filterInfo.search.toLowerCase());
                let isEmail = item.email.toLowerCase().includes(filterInfo.search.toLowerCase());
                let isCountry = item.country.toLowerCase().includes(filterInfo.search.toLowerCase());
                console.log("isFirstName", isFirstName, "isEmail", isEmail, "isCountry", isCountry);
                if (isId) {
                    return item
                } else if (isFirstName) {
                    return item
                } else if (isEmail) {
                    return item
                } else if (isCountry) {
                    return item
                }
            } else {
                return item
            }
        })
        console.log("newData", newData);

        let newDataList = newData.slice(fromDataIndex, toDataIndex)
        let responseData = { dataList: newDataList, totalCount: newData.length };
        return responseData;
    }

    useEffect(
        () => {
            let fromDataIndex = data.fromDataIndex;
            let toDataIndex = data.toDataIndex;
            let { totalCount } = getAllData(fromDataIndex, toDataIndex);
            setPageInfo({ ...pageInfo, totalCount });
        }, []
    );

    useEffect(
        () => {
            let fromDataIndex = pageInfo.currentPage === 1 ? 0 : (pageInfo.currentPage * pageInfo.pageSize) - pageInfo.pageSize;
            let toDataIndex = pageInfo.currentPage === 1 ? pageInfo.pageSize : pageInfo.currentPage * pageInfo.pageSize;
            let { dataList, totalCount } = getAllData(fromDataIndex, toDataIndex);
            setData({ dataList: dataList, fromDataIndex, toDataIndex })
            setPageInfo({ ...pageInfo, totalCount });
            setIsDesplay(null);
        }, [pageInfo.currentPage, pageInfo.pageSize, filterInfo.country, filterInfo.firstName, filterInfo.id, filterInfo.email,filterInfo.search]
    );

    return (
        <div className="row justify-content-center mt-5 ">
            <div className="col-12 col-md-12 col-xl-12 col-lg-12 col-sm-12 ">
                {/* after pagination bottom padding if need then remove pb-0 */}
                <div className="container custom_form mt-5 pb-0">
                    <div className="row ">
                        <div className="col-12 col-md-auto mr-auto float-md-left h4 text-center ">
                            <div>
                                User Management
                            </div>
                        </div>
                        <div className="col-12 col-md-auto float-right">
                            <Filter filterInfo={filterInfo} setFilterInfo={setFilterInfo} pageInfo={pageInfo} setPageInfo={setPageInfo} />
                        </div>
                    </div>
                    <div className="row  mt-0 mb-0 mr-n4 ml-n4" >
                        <div className="col-12" >
                            {/* after pagination bottom mrgin if need mb-2 */}
                            <div className=" mt-2 ml-2 mr-2" >
                                {/* overflow-auto for horizontel over flow with  min_width_1000  in row*/}
                                <div className="container-fluid border overflow-auto" >

                                    <div className="row text-center font-weight-bold  border-bottom min_width_1000">
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    ID
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    First Name
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    Email
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    Country
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="">
                                                <div className=" p-2">
                                                    Action
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        data.dataList.map((item, index) => {
                                            let borderClass = data.dataList.length - 1 !== index || index === isDesplay ? "border-bottom" : ""
                                            return (
                                                <div key={index} >
                                                    <div className={`row text-center  ${borderClass} min_width_1000`}>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.firstName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.country}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="">
                                                                <div className="p-1">
                                                                    <button onClick={() => viewDetails(index, item)} type="button" className="btn btn-primary btn-sm">More Options</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        isDesplay === index &&
                                                        <ChieldUserTable data={chieldData} />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    //signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    // handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    // handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);
import React, { useEffect } from 'react';
import _ from 'lodash';

function Filter(props) {

    let CountryLit = [
        { id: 1, country: "Bangladesh" },
        { id: 2, country: "India" },
        { id: 3, country: "Pakistan" },
        { id: 4, country: "Germany" },
        { id: 5, country: "Italy" },
        { id: 6, country: "France" },
    ];

    let onChangeValue = (item) => {
        // sort Number
        // filterInfo.sort((a,b)=> a.id -b.id);
        let {name,value}=item;
        let filterInfo={...props.filterInfo}
        console.log(name,":",value);
        props.setFilterInfo({...filterInfo,[name]:value});
    }


    return (

        <div className="row text-center  min_width_1000 border-bottom">
            <div className="col pl-0">
                <div className="">
                    <div className=" p-2">
                        <input name="id" type="text" className="form-control" onChange={({ currentTarget: input }) => onChangeValue({ name: input.name, value: input.value })} />
                    </div>
                </div>
            </div>
            <div className="col pl-0">
                <div className="">
                    <div className=" p-2">
                        <input name="firstName" type="text" className="form-control" onChange={({ currentTarget: input }) => onChangeValue({ name: input.name, value: input.value })} />
                    </div>
                </div>
            </div>
            <div className="col pl-0">
                <div className="">
                    <div className=" p-2">
                        <input name="email" type="text" className="form-control" onChange={({ currentTarget: input }) => onChangeValue({ name: input.name, value: input.value })} />
                    </div>
                </div>
            </div>
            <div className="col pl-0">
                <div className="">
                    <div className=" p-2">
                        <select
                            value={props.filterInfo.country}
                            className="form-control mb-2 "
                            onChange={({ currentTarget }) => onChangeValue({ name: "country", value: currentTarget.value })} >
                            <option key="allCountry" value="allCountry" >All Country</option>
                            {CountryLit.map((item, index) => {
                                return (
                                    <option
                                        key={item.id + 100}
                                        value={item.country}
                                    >{item.country}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="col pl-0">
                <div className="">
                    <div className="p-2 ">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
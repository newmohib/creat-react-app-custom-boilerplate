import React from 'react';

let TextInput = ({
    divClass,
    labelClass,
    labelFor,
    labelText,
    placeholder,
    inputClass,
    inputId,
    inputType,
    inputName,
    onChange,
    error,
    errorClass,
    value }) => {
    return (
        <div className={divClass}>
            <label className={labelClass} htmlFor={labelFor}>{labelText}</label>
            <input name={inputName} onChange={onChange} placeholder={placeholder} type={inputType} className={inputClass} id={inputId} value={value} />
            {error && <div className={errorClass}>{error}</div>}
        </div>
    );
};

let Select = ({
    divClass,
    labelClass,
    labelFor,
    labelText,
    placeholder,
    inputClass,
    selectClass,
    inputId,
    inputType,
    inputName,
    onChange,
    error,
    errorClass,
    value,
    options }) => {
    return (
        <div className={divClass}>
            <label className={labelClass} htmlFor={labelFor}>{labelText}</label>
            <select name={inputName} onChange={onChange} value={value} className={inputClass} id={inputId} >
                {
                    options.map((item, index) => {
                        return <option key={index} value={item.optionValue}>{item.optionText}</option>
                    })
                }
            </select>
            {error && <div className={errorClass}>{error}</div>}
        </div>
    );
};

let File = ({
    divClass,
    chieldDivClass,
    labelClass,
    labelFor,
    labelText,
    placeholder,
    inputClass,
    selectClass,
    inputId,
    inputType,
    inputName,
    onChange,
    error,
    errorClass,
    value,
    options }) => {
    return (
        <div className={divClass} >
                <spain id="imageHelp" class="form-text mb-1">Image</spain>
            <div className={chieldDivClass}>
                <input onChange={onChange} name={inputName} type={inputType} className={inputClass} id={inputId} aria-describedby="imageHelp" />
                <label className={labelClass} htmlFor={labelFor}>
                    {value ? value : "Choose Image"}
                </label>
            </div>
            {error && <div className={errorClass}>{error}</div>}
        </div>
    );
};


export { TextInput, Select, File };

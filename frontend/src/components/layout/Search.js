import React, { useState } from 'react'

const Search = ( { history } ) => {
    const [ keyword, setKeyword ] =  useState('')
    function searchHandler(e) {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else {
            history.push("/")
        }
    }
    return (
        <form onSubmit={searchHandler}>
                    <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e)=> {setKeyword(e.target.value)}}
            style={{borderTopLeftRadius: '20px',borderBottomLeftRadius: '20px'}}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn" style={{position: 'relative',bottom: '6px',height: '38px',borderTopRightRadius: '20px',borderBottomRightRadius: '20px'}}>
              <i className="fa fa-search text-center" aria-hidden="true"  style={{position: 'relative',bottom: '3px',fontSize: "16px"}}></i>
            </button>
          </div>
        </div>
        </form>
    )
}

export default Search

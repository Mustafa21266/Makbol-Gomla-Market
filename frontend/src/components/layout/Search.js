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
                    <div>
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="أدخل إسم المنتج : "
            onChange={(e)=> {setKeyword(e.target.value)}}
            style={{borderTopLeftRadius: '20px',borderBottomLeftRadius: '20px',marginBottom: '15px',fontFamily: 'system-ui'}}
          />
          <div>
            <button id="search_btn" className="btn" style={{display:'block',margin:"auto"}}>
              <i className="fa fa-search text-center" aria-hidden="true"  style={{position: 'relative',bottom: '3px',fontSize: "16px",color:'white'}}></i>
            </button>
          </div>
        </div>
        </form>
    )
}

export default Search

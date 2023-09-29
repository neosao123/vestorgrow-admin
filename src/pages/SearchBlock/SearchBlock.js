import React from 'react'

export default function SearchBlock({ heading, para, placeholder, searchData, count }) {
  return (
    <div className="total_updates_top ActiveLinks">
      <div className="walletAddressHead accountChangeHead ">
        <h5 className="m-0">{heading}{count ? <span className='headCount'>Count: {count}</span> : ""}</h5>
      </div>
      <div className="d-flex active_link_customs">
        <p className="m-0 pt-2">{para}</p>
        <div className="updates_search">
          <div className="input-group update_search_bar">
            <button className="btn" type="button" style={{ zIndex: 1 }}>
              <img
                src="/assets/images/icons/search.svg"
                alt="logo"
                className="img-fluid"
              />
            </button>
            <input
              type="text"
              className="form-control border-0"
              placeholder={placeholder}
              onChange={(e) => {
                searchData(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

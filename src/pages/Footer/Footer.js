import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footerCard w-100 clearfix">
      <div className="lernFooter w-100 d-block d-md-none">
        <h5>VestorGrow</h5>
        <div className="ljpFlex d-flex justify-content-between">
          <div className="sideImg">
            <img src="assets/images/icons/box.svg" className="img-fluid" />
          </div>
          <div className="sideTexts">
            <p>
              Our mission is to onboard & educate 1,000,000+ New NFT users in
              the next few years through our platform & our resources.
              #VestorGrow
            </p>
          </div>
        </div>
      </div>
      <div className="btmFooter">
        <h5 className=" d-block d-md-none">SOCIAL LINKS</h5>
        <div className="btmFlex d-flex justify-content-between align-items-center">
          <p className="m-0">© 2022 LearnJPEG. All Rights Reserved.</p>
          <ul className="list-unstyled d-flex SocialLists m-0">
            <li>
              <Link to="#" className="d-inline-block">
                <img
                  src="assets/images/icons/1.svg"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </li>
            <li>
              <Link to="#" className="d-inline-block">
                <img
                  src="assets/images/icons/2.svg"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </li>
            <li>
              <Link to="#" className="d-inline-block">
                <img
                  src="assets/images/icons/3.svg"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </li>
            <li>
              <Link to="#" className="d-inline-block">
                <img
                  src="assets/images/icons/4.svg"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

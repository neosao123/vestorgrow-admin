import React from "react";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import UserAccount from "./UserAccount";
import WalletAddress from "./WalletAddress";

export default function Account() {
  return (
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      <div className="titleCard topTitle card">
        <h4>ACCOUNT</h4>
      </div>
      <div className="accountOuter">
        <div className="accountInner d-flex card">
          <div className="w-50 accountLeft">
            <UserAccount />
          </div>
          <div className="w-50 accountRight">
            <div className="accountRightInner">
              <ChangePassword />
              <WalletAddress />
              <div className="w-100 clearfix mobAccountBtn d-block d-md-none py-4">
                <Link to="#" className="btn btnForm">
                  log out
                </Link>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

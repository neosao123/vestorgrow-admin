import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import InfoUpdate from "./InfoUpdate";
import Login from "./Login";
import LoginHeader from "./LoginHeader";

function LoginPage(props) {
  return (
    <main className="w-100 clearfix mainSection">
      <div className="w-100 clearfix rightSection">
        <div className="contantSection">
          <LoginHeader />
          <section className="w-100 clearfix loginFormSection">
            <div className="w-100 logInSection d-flex align-items-center">
              <InfoUpdate />

              <Login {...props} />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default LoginPage;

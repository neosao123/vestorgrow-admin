import React, { createContext, useState, useEffect } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [searchDtl, setSearchDtl] = useState({});
  const [courses, setCourses] = useState([]);

  const setSearchDetails = (payload) => {
    setSearchDtl({
      ...searchDtl,
      ...payload,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        searchDtl,
        setSearchDetails,
        courseChange: [courses, setCourses],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContext;

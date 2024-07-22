import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [suggestionId, setSuggestionId] = useState(null);

  return (
    <UserContext.Provider
      value={{
        companyDetails,
        setCompanyDetails,
        suggestionId,
        setSuggestionId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

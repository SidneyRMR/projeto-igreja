import React, {createContext, useState} from 'react';

export const InfoGeraisContext = createContext();

export const InfoGeraisContextProvider = (props) => {
    const [sangria, setSangria] = useState(0);
    return (
        <InfoGeraisContext.Provider sangria={[sangria, setSangria]}>
            {props.children}
        </InfoGeraisContext.Provider>
    );
}

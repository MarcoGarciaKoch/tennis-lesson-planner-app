import React, { ReactNode, useState } from "react";
import { AlertMessageCallContext, alertMessageInitialValues } from "./alertMessageCall.context";
import { AlertMessageData } from '../../Pages/Dashboard/dashboard.model'

const AlertMessageCallProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [alertParameters, updateAlertParameters] = useState<AlertMessageData>(alertMessageInitialValues);

    return (
        <AlertMessageCallContext.Provider value={{alertParameters, updateAlertParameters}}>
            {children}
        </AlertMessageCallContext.Provider>
    )
}


export default AlertMessageCallProvider;
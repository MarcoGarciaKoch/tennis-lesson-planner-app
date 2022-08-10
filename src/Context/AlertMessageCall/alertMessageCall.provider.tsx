import React, { ReactNode, useState } from "react";
import { AlertMessageCallContext } from "./alertMessageCall.context";
import { AlertMessageData } from '../../Pages/Dashboard/dashboard.model'

const AlertMessageCallProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [alertParameters, updateAlertParameters] = useState<AlertMessageData>({id:'', show:false, action:''});

    return (
        <AlertMessageCallContext.Provider value={[alertParameters, updateAlertParameters]}>
            {children}
        </AlertMessageCallContext.Provider>
    )
}


export default AlertMessageCallProvider;
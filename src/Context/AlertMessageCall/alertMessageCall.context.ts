import { createContext } from 'react';
import { AlertMessageData } from '../../Pages/Dashboard/dashboard.model';

export const alertMessageInitialValues = {
    id:'',
    show:false,
    action:''
}


export const AlertMessageCallContext = createContext({alertParameters: alertMessageInitialValues, 
                                        updateAlertParameters: (alertParameters:AlertMessageData) => {} });
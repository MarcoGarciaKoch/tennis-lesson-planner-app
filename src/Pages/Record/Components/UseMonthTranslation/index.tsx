import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';


export const useMonthTranslation = () => {
    const [t] = useTranslation('translation');

    const getMonthName = useCallback((monthNumber:number) => {
    
        switch (monthNumber) {
            case 1: 
                return t('specific.record.monthName.1')
            case 2: 
                return t('specific.record.monthName.2')
            case 3: 
                return t('specific.record.monthName.3')
            case 4: 
                return t('specific.record.monthName.4')
            case 5: 
                return t('specific.record.monthName.5')
            case 6: 
                return t('specific.record.monthName.6')
            case 7: 
                return t('specific.record.monthName.7')
            case 8: 
                return t('specific.record.monthName.8')
            case 9: 
                return t('specific.record.monthName.9')
            case 10: 
                return t('specific.record.monthName.10')
            case 11: 
                return t('specific.record.monthName.11')
            case 12: 
                return t('specific.record.monthName.12')
            default:
                return ''
        }
    },[t])

    return {
        getMonthName
    }
}


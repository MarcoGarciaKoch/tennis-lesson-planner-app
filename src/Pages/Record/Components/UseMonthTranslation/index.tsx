import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';


export const useMonthTranslation = () => {
    const [t] = useTranslation('translation');

    const getMonthNamebyNumber = useCallback((monthNumber:number) => {
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

    const getMonthNamebyName = useCallback((monthName:string) => {
        switch (monthName) {
            case 'Enero': 
                return t('specific.record.monthName.1')
            case 'Febrero': 
                return t('specific.record.monthName.2')
            case 'Marzo': 
                return t('specific.record.monthName.3')
            case 'Abril': 
                return t('specific.record.monthName.4')
            case 'Mayo': 
                return t('specific.record.monthName.5')
            case 'Junio': 
                return t('specific.record.monthName.6')
            case 'Julio': 
                return t('specific.record.monthName.7')
            case 'Agosto': 
                return t('specific.record.monthName.8')
            case 'Septiembre': 
                return t('specific.record.monthName.9')
            case 'Octubre': 
                return t('specific.record.monthName.10')
            case 'Noviembre': 
                return t('specific.record.monthName.11')
            case 'Diciembre': 
                return t('specific.record.monthName.12')
            case 'January': 
                return t('specific.record.monthName.1')
            case 'February': 
                return t('specific.record.monthName.2')
            case 'March': 
                return t('specific.record.monthName.3')
            case 'April': 
                return t('specific.record.monthName.4')
            case 'May': 
                return t('specific.record.monthName.5')
            case 'June': 
                return t('specific.record.monthName.6')
            case 'July': 
                return t('specific.record.monthName.7')
            case 'August': 
                return t('specific.record.monthName.8')
            case 'September': 
                return t('specific.record.monthName.9')
            case 'October': 
                return t('specific.record.monthName.10')
            case 'November': 
                return t('specific.record.monthName.11')
            case 'December': 
                return t('specific.record.monthName.12')
            default:
                return ''
        }
    },[t])

    return {
        getMonthNamebyNumber,
        getMonthNamebyName
    }
}


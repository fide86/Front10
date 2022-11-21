import React, { useMemo } from 'react'
import axios from 'axios';

const FligthsContext = React.createContext(); // Creando el FligthsContext

export const FligthsProvider = (props) => {
    const URL = 'localhost:2000/iliso'

    // Envío de datos al server por medio de axios
    const findFligths = (values) => {
        axios.post(`${URL}/find_fligths`,values)
            .then(r => {
                console.log('r',r,values);
            }).catch(e => console.log(e));
    }
    
    // Poner funcionalidad findFligths en 'value' para que este disponible en el provider
    const value = useMemo(() => {
        return ({
            findFligths,
        })
    },[])

    return <FligthsContext.Provider value={value} {...props} />
}

export function useFligths() {
    const context = React.useContext(FligthsContext);
    if (!context) {
        throw new Error('Error! Context null or undefined!')
    }
    return context;
}

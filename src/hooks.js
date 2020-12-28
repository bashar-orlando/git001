import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSearch = (query) => {
    const [state, setState] = useState({
        articles: [],
        status: 'IDLE',
        error: ''
    });

    useEffect(() => {
        if (query.length < 3) {
            return;
        }
        // "`"  left-to-right accent is VERY IMPORTANT!!!
        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${query}`)
            .then(function (response) {
                const parsedResponse = [];
                for (let i=0; i<response.data[1].length; i++) {
                    parsedResponse.push({
                        id: response.data[3][i],
                        label: response.data[1][i]
                    })
                }
                //debugger
                setState({
                    articles: parsedResponse,
                    status: 'SUCCESS',
                    error: ''
                })
            })
            .catch(function (error) {
                setState({
                    articles: [],
                    status: 'ERROR',
                    error: error
                })
                //console.log(error);
                //debugger
          });
    }, [query] );
 
    return state;    
}
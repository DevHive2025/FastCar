import { useState, useEffect } from 'react';
import { contratAPI,carAPI } from './api';
export const useFetchcontrats = ()=>{
    const [contrats, setContrats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await contratAPI.getAll();
            setContrats(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des contrats:", error);
        }
    }
    fetchData();
    }, []);
    return{contrats};
} 
export const useFetchcars = ()=>{
    const [car, setCar] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await carAPI.getAll();
            setCar(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des contrats:", error);
        }
    }
    fetchData();
    }, []);
    return{car};
}
export default {useFetchcontrats,useFetchcars};  
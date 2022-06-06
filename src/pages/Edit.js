import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from "axios";
import Card from '../components/Card';

const Edit = () => {
    const [optionValue, setOptionValue] = useState(0);
    const [data, setData] = useState([]);
    const [villes, setVilles] = useState({});
    const cookiesName = 'villes';
    

    useEffect(() => {
        axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => setData(res.data.filter((country) => country.capital !== undefined).sort((a, b) => b.population - a.population)))
        .then(() => {
        if(JSON.parse(localStorage.getItem(cookiesName)) !== null){
            setVilles(JSON.parse(localStorage.getItem(cookiesName)));
        }})
    }, [])

    const addPays = (i) => {   
        const ville = {
            "id": i,
            "flag": data[i].flags.svg,
            "pays": data[i].translations.fra.common,
            "capital": data[i].capital[0],
            "population": data[i].population.toLocaleString(),
            "lat": parseFloat(data[i].latlng[0]),
            "lng": parseFloat(data[i].latlng[1])
        }
    
        const SetVille = (i, ville) => {
            villes[i] = ville
            setVilles(villes)
            localStorage.setItem(cookiesName, JSON.stringify(villes));
        }
    
        if(JSON.parse(localStorage.getItem(cookiesName)) !== null){
            setVilles(JSON.parse(localStorage.getItem(cookiesName)));
        }
        SetVille(i, ville)
        console.log(JSON.parse(localStorage.getItem(cookiesName)));
    }

    const PaysListe = () => {
        if(JSON.parse(localStorage.getItem(cookiesName)) !== null){
            return(
                <ul>
                {Object.entries(JSON.parse(localStorage.getItem(cookiesName)))
                    .map(([key, value]) => (
                        <Card key={key} country={value}/>
                ))}
                </ul>
            )
        }
    }

    return (
        <div>
        <Navigation/>
        <div className='edit'>
            <div className='selector'>
            <h1>Mode Edition : </h1>
            <select onChange={(e) => setOptionValue(parseInt(e.target.value))}>
                {data
                .map((country, index) => (
                <option key={index} value={index}>{country.capital + " (" + country.translations.fra.common + ")"}</option>
                ))};
            </select>
            <button onClick={() => addPays(optionValue)}>Ajouter</button>
            </div>
            <PaysListe/>
        </div>
        </div>
    );
};

export default Edit;
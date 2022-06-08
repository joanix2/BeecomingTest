import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from "axios";
import Card from '../components/Card';

const Edit = () => {
    const [optionValue, setOptionValue] = useState(0);
    const [data, setData] = useState([]);
    const cookiesName = 'villes';

    let villes = {};
    

    useEffect(() => {
        axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => setData(res.data.filter((country) => country.capital !== undefined).sort((a, b) => b.population - a.population)))
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
    
    
        if(JSON.parse(localStorage.getItem(cookiesName)) !== null){
            villes = JSON.parse(localStorage.getItem(cookiesName));
            console.log("refresh var")
        }

        //console.log(JSON.parse(localStorage.getItem(cookiesName)));

        villes[i] = ville
        localStorage.setItem(cookiesName, JSON.stringify(villes));
        window.location.reload(false);
        
        //console.log(JSON.parse(localStorage.getItem(cookiesName)));
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
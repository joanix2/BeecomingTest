import React from 'react';

const Card = ({ country}) => {
    return (
        <li className="card">
            <img src={country["flag"]} alt={country["pays"] + " flag"} />
            <div className='infos'>
                <button onClick={() => {
                    const cookiesName = 'villes';
                    let villes = JSON.parse(localStorage.getItem(cookiesName));
                    delete villes[country["id"]]
                    localStorage.setItem(cookiesName, JSON.stringify(villes));
                    window.location.reload(false);
                    //console.log(JSON.parse(localStorage.getItem(cookiesName)));
                }}>X</button>
                <h2>{country["pays"]}</h2>
                <h4>{country["capital"]}</h4>
                <p>Pop. {country["population"]}</p>
            </div>
        </li>
    );
};

export default Card;
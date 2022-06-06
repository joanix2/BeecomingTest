import React from 'react';
import Navigation from '../components/Navigation';

const Consignes = () => {
    return (
        <div>
            <Navigation/>
            <h1>Consignes</h1>
            <div className='consignes'>
            <p>Créer une application contenant 2 écrans et un menu permettant de passer d’un écran à l’autre.</p>
            <ul>
                <li>L’écran 1 permet d’afficher une carte avec 5 capitales de votre choix, représentées par des markers.
                    <ol>
                        <li>Lors du clic sur un marker, une légende affiche le nom de la ville et le nombre d’habitants.</li>
                        <li>Il est possible de voir sa propre position tel que le propose GoogleMaps.</li>
                    </ol>
                </li>
                <li>L’écran 2 permet d’afficher la liste des capitales, d’en créer des nouvelles, d’éditer et de supprimer les existantes (pays, ville, population)</li>
            </ul>
            </div>
        </div>
    );
};

export default Consignes;
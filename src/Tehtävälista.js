import './App.css';
import React, { useState } from 'react';

const Tehtavalista = () => {
  //tilan määrittäminen inputin arvolle
  const [uusiTehtava, asetaUusiTehtava] = useState('');

  //tila tehtävien säilyttämiseksi
  const [tehtavat, asetaTehtavat] = useState([]);

  //käsittele inputin muutoksia ja päivitä tilaa
  const muutaTehtävä = (event) => {
    asetaUusiTehtava(event.target.value);
  };

  //käsittele uuden tehtävän lisäämistä
  const lisaaTehtava = () => {
    if (uusiTehtava.trim() !== '') {
      //kopioi nykyiset tehtävät ja lisää uusi tehtävä
      const uusiTehtavaObj = { teksti: uusiTehtava, valittu: false }
      const uudetTehtavat = [...tehtavat, uusiTehtavaObj];
      //päivitä tehtävien tila
      asetaTehtavat(uudetTehtavat);
      //tyhjennä input uuden tehtävän lisäämisen jälkeen
      asetaUusiTehtava('');
    }
  };

  const poistaValitutTehtavat = () => {
    //luo uusi taulukko, joka sisältää tehtävät ilman valittuja
    const uudetTehtavat = tehtavat.filter((tehtava) => !tehtava.valittu);
    //päivitä tehtävien tila
    asetaTehtavat(uudetTehtavat);
  };

  const toggleTehtavanValinta = (index) => {
    //kopioi tehtävät
    const kopioTehtavat = [...tehtavat];
    //vaihda valittu-attribuutin tila valitulle tehtävälle
    kopioTehtavat[index].valittu = !kopioTehtavat[index].valittu;
    //päivitä tehtävien tila
    asetaTehtavat(kopioTehtavat);
  };


  return (
    <div className="wrapper">
      <h2>Tehtävät</h2>
      <ul className="list-group">
        {tehtavat.map((tehtava, index) => (
          <li className="list-group-item" key={index}>
            {tehtava.teksti}
            <input
              type="checkbox"
              checked={tehtava.valittu || false}
              onChange={() => toggleTehtavanValinta(index)}
            />
          </li>
        ))}
      </ul>
      <input
        className="panel-heading"
        type="text"
        value={uusiTehtava}
        onChange={muutaTehtävä}
        placeholder="Lisää uusi tehtävä"
      />
      <br></br>
      <button className="btn btn-lg btn-success" onClick={lisaaTehtava}>Lisää tehtävä</button>
      <button className="btn btn-lg btn-danger" onClick={poistaValitutTehtavat}>Poista valmiit tehtävät</button>
    </div>
  );
};

export default Tehtavalista;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Country from './Country';

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  border: 1px solid red;
  justify-content: center;
  background: var(--background);
  padding: 4em 2em;
`;

const CountryList = () => {
    const [countryList, setCountryList] = useState([])
    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setCountryList(data)
                console.log(data);
            })
            .catch(() => console.log("Hubo un erroe"))
    }, [])
    return (
        <CountryListStyled>
            {
                countryList.map(({ flag, name, population, region, capital }) => {
                    return (
                        < Country
                            key={name}
                            flag={flag}
                            name={name}
                            population={population}
                            region={region}
                            capital={capital}
                        />
                    )
                })
            }


        </CountryListStyled>
    );
}

export default CountryList;

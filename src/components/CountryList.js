import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Country from './Country';
import { useSelector, useDispatch } from 'react-redux'

const CountryListStyled = styled.div`
  display: grid;
  grid-row-gap: 2.3em;
  border: 1px solid red;
  justify-content: center;
  background: var(--background);
  padding: 4em 2em;
`;

const CountryList = () => {
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch();

    const countryListByName = useSelector((state) => state.countryListByName)


    const countryList = useSelector((state) => {
        if ('' !== state.filterByRegion) {
            return state.coutryFilteredByRegion;
        }
        if (countryListByName.length > 0) {
            return countryListByName
        }

        return state.countryList;
    })
    console.log(countryList);
    // const [countryList, setCountryList] = useState([])
    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then((res) => {
                return res.json()
            })
            .then((list) => {
                dispatch({
                    type: 'SET_COUNTRY_LIST',
                    payload: list
                })
                // setCountryList(list)
                console.log(list);
            })
            .catch(() => console.log("Hubo un erroe"))
    }, [])
    const filterByName = (e) => {
        setInputValue(e.target.value)
        dispatch({
            type: 'SET_COUNTRY_BY_NAME',
            payload: e.target.value
        })
    }
    const clearInput = () => {
        dispatch({
            type: 'SET_COUNTRY_BY_NAME',
            payload: ''
        })
        setInputValue('')
    }
    return (
        <CountryListStyled>
            <input type="text" value={inputValue} onChange={filterByName} />
            {
                inputValue &&
                <button onClick={clearInput}>X</button>
            }
            {
                countryListByName.length === 0 && inputValue &&
                <p>
                    <strong>{inputValue}</strong> Not found in countries
        </p>
            }
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

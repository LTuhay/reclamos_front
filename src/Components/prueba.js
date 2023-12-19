import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import SearchBar from "../Search/searchBar";
import List from "../List/list";
import styles from './giphyApp.module.css';
import searchGiphys from "../services/giphySearch";

function GiphyApp() {
    const [query, setQuery] = useState('');
    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        searchGiphys(query)
            .then((res) => {
                setGifs(res.data);
            });
    },[query]);

    const onHandleChange = debounce((input) => {
        setQuery(input.target.value);
    }, 500);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <SearchBar handleChange={onHandleChange}/>
                <List listValues={gifs} />
            </div>       
        </div>
    );
}

export default GiphyApp;
// EdificiosSearch.js
import React, { useState } from 'react';
import Boton from './Boton';

const EdificiosSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setIsSearching(false);
            onSearch(''); 
        } else {
            setIsSearching(true);
            onSearch(searchTerm);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        onSearch(''); 
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por dirección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: '8px' }}
            />

            <Boton color="btn-success" label="Buscar" onClick={handleSearch} />
            {isSearching && (
                <Boton label="Limpiar búsqueda" onClick={handleClearSearch} style={{ marginRight: '8px' }}/>
            )}
        </div>
    );
};

export default EdificiosSearch;

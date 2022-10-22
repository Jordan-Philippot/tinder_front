import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';

export default function GooglePlaces({setAddress, address}) {

    const handleChange = address => {
        setAddress(address);
    };
    const handleSelect = address => {
        setAddress(address);
    };
   
    return (
        <PlacesAutocomplete
            value={address || ''}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        minLength="5"
                        maxLength="100"
                        name={address}
                        id={address}
                        {...getInputProps({
                            placeHolder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className={`autocomplete-dropdown-container ${suggestions.length > 0 ? "active" : ""}`}>
                        {loading &&
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        }
                        {suggestions.map((suggestion, key) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div key={key}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

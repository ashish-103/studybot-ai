import React, { useState } from 'react';
import { countries } from '../utils/data';

const CountryDropdown = ({ handleChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSelect = (countryName) => {
    handleChange({ target: { name: "country", value: countryName } });
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <label
        className="block required  font-bold tracking-wide"
        htmlFor="country"
      >Country
      </label>
      <div
        className="w-full border rounded-lg text-sm p-2  cursor-pointer  bg-white border-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select a country"}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full text-sm border border-gray-500 bg-white shadow-lg max-h-64 overflow-y-auto mt-1 z-50 ">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border-b mt-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
              }
            }}
          />
          {countries
            .filter((c) =>
              c.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((country) => (
              <div
                key={country.code}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(country.name)} >
                {country.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
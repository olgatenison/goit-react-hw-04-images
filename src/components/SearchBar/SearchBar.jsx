import React, { useState } from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState(''); // зберігає те, що ввели в пошук
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = inputValue.trim();

    // Порівнюємо searchQuery з попереднім searchName
    if (searchQuery !== searchName) {
      // Виконуємо оновлення стану лише у випадку, якщо новий запит не рівний попередньому
      onSubmit(searchQuery);
      setSearchName(searchQuery);
      setInputValue('');
    }
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="searchName"
          placeholder="What photo do you want to find?"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

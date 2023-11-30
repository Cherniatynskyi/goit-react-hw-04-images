import { useState } from "react";
import css from './SearchBar.module.css'


export const SearchBar = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const handleChange = ({ target: { value } }) => {
        setValue(value)
    }


    const handleSubmit = (e) => {
        if (!value) {
        alert("Enter your search term")
        return
    }
        e.preventDefault()
        onSubmit({value})
    }

  
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                    <span className="button-label">Search</span>
                    </button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        value={value}
                    />
                </form>
            </header>
        )
}
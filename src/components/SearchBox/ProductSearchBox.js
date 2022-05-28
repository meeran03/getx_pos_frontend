import React from 'react';
import { searchProductVariations } from 'Services/Products';
import SearchBox from './SearchBox';

export default function ProductSearchBox(props) {
    const renderField = 'name';
    const [query, setQuery] = React.useState('');
    const [data, setData] = React.useState([]);
    const search = async (e, value, reason) => {
        setQuery(e.target.value);
        if (e.target.value.length > 0) {
            try {
                let res = await searchProductVariations(e.target.value)
                setData(res)
                // if (reason === 'select-option') {
                console.log(reason)
            } catch (e) {
                console.log(e.response.data)
                throw e
            }
        }
    }
    const autoChange = (e, value, reason) => {
        if (reason === 'select-option') {
            console.log(value, reason)
            props.onChange(data.find(item => item.name === value[value.length - 1]))
            // props.onChange(e.target.value)
        }
    }
    return (
        <div xs={12} sm={12} md={12}>
            <SearchBox
                renderField={renderField}
                value={query}
                onChange={search}
                data={data}
                autoChange={autoChange}
            />
        </div>
    )
}
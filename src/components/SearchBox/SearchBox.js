/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chip, makeStyles } from '@material-ui/core';

export default function SearchBox(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: 500,
            '& > * + *': {
                marginTop: theme.spacing(3),
            },
        },
    }));
    const classes = useStyles();
    return (
        <div xs={12} sm={12} md={12}
        // className={classes.root}
        >
            <Autocomplete
                freeSolo
                id="search-input"
                disableClearable
                multiple
                limitTags={1}
                options={props.data.map((option) => option[props.renderField])}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            size="large"
                        />
                    ))
                }
                onChange={props.autoChange ? props.autoChange : () => console.log("autoChange not defined")}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        onChange={props.onChange}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        value={props.value}
                        fullWidth={true}
                    />
                )}
            />
        </div>
    );
}

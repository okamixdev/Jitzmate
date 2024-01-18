import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { ALL_USERS } from '../../Utils/queries';
import { useQuery } from '@apollo/client';
import { Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export const AsyncSearchBar = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const { data } = useQuery(ALL_USERS);
    const oldArray = (data?.allUsers);
    const userArray = [{}]

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                for (let i = 0; i < oldArray.length; i++) {
                    userArray.push(oldArray[i])
                }
                userArray.shift()
                setOptions([...userArray]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    console.log(options)

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            disablePortal
            id="asynchronous-demo"
            sx={{
                width: 180, bgcolor: '#ff5858', backgroundImage: 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)' , 'border-radius': '30px',
                "& fieldset": { border: 'none' }, 'height': '30px', 'padding-top': '0px',
                // 'padding-bottom': '0px', "& [aria-activedescendant]": { bgcolor: "blue" }
                // '& + .MuiAutocomplete-popper .MuiAutocomplete-option': { bgcolor: '#ff5858' },

            }}

            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.username === value.username}
            getOptionLabel={(option) => option.username}
            options={options}

            renderOption={(props, option) => {
                const { username } = option;
                return (
                    <span {...props} style={{ backgroundColor: '#ff5858', 'border-radius': '30px', 'text-decoration': 'none !important', 'color': 'inherit' }}>
                        <NavLink style={{ color: 'inherit' }} className='noStyle' to="/ouser" state={{ user: `${option._id}` }} >{username}</NavLink>
                        {/* {username} */}
                    </span>
                );
            }}
            PaperComponent={({ children }) => (
                <Paper style={{ background: "#ff5858", 'border-radius': '30px', 'margin-top': '5px' }}>{children}</Paper>
            )}

            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    // label="username"

                    InputProps={{
                        ...params.InputProps,

                        endAdornment: (
                            <React.Fragment style={{ 'background-color': 'blue' }}>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
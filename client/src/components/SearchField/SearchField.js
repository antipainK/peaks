import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    backgroundColor: theme.palette.common.white,
  },
}));

export default function SearchField({
  value,
  onSearch,
  className = '',
  ...rest
}) {
  const classes = useStyles();
  return (
    <TextField
      className={`${classes.search} ${className}`}
      value={value || ''}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Szukaj..."
      variant="outlined"
      fullWidth
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

export const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor:
      state.isFocused || state.isSelected
        ? '#16B364'
        : provided.backgroundColor,
    color: state.isFocused ? '#ffffff' : provided.color,
    padding: '8px 10px',
    fontSize: '0.875rem',
    borderRadius: state.isFocused ? '0.25rem' : '0',
    boxSizing: 'border-box',
  }),
  control: (provided: any) => ({
    ...provided,
    borderColor: '#e2e2e2',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#e2e2e2',
    },
    height: '40px',
    borderWidth: '0.3px',
  }),
  input: (provided: any) => ({
    ...provided,
    margin: 0,
    padding: '0',
    fontSize: '0.875rem',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: '#6c757d',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#000',
    fontSize: '0.875rem',
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: '5px',
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: '3px',
  }),
};

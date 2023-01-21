import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import { Wrapper } from './Filter.styled';
import { Input, InputTitle, Label } from 'components/ContactForm';

export const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = evt => {
    const request = evt.target.value.toLowerCase().trim();
    dispatch(setFilter(request));
  };

  return (
    <Wrapper>
      <Label>
        <InputTitle>Find contacts by name</InputTitle>
        <Input
          type="text"
          name="filter"
          value={value}
          onChange={handleChangeFilter}
        />
      </Label>
    </Wrapper>
  );
};

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { Button, ContactItem } from './Contact.styled';

export const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <ContactItem>
      <p>{name}:</p>
      <p>{number}</p>
      <Button
        name={id}
        type="Button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Deleted
      </Button>
    </ContactItem>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

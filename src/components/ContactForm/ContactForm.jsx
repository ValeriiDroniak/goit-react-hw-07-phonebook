import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import {
  Button,
  Error,
  FieldInput,
  FormContact,
  InputTitle,
  Label,
} from './ContactForm.styled';

const nameRedex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberRedex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = yup.object().shape({
  name: yup.string().matches(nameRedex).required('Contact name is required'),
  number: yup
    .string()
    .matches(numberRedex, 'Invalid phone.')
    .min(9, 'At least 9 digits is required')
    .max(11, 'At most 11 digits is required')
    .required('Phone number is required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const createContact = ({ name, number }) => {
    const newName = name.toLowerCase().trim();
    const foundName = contacts.find(
      contact => contact.name.toLowerCase() === newName
    );

    if (foundName) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      name: name.trim(),
      number: number.trim(),
    };
    dispatch(addContact(newContact));
    return foundName;
  };

  const handleSubmit = (values, { resetForm }) => {
    createContact(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormContact>
        <Label htmlFor="name">
          <InputTitle>Name</InputTitle>
          <FieldInput type="text" name="name" />
          <ErrorMessage
            name="name"
            component="div"
            render={message => <Error>{message}</Error>}
          />
        </Label>
        <Label htmlFor="number">
          <InputTitle>Number</InputTitle>
          <FieldInput type="tel" name="number" />
          <ErrorMessage
            name="number"
            component="div"
            render={message => <Error>{message}</Error>}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </FormContact>
    </Formik>
  );
};

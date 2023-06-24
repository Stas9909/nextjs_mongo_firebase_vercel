import styles from './NewsletterRegistration.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { showNotification } from '@/Redux/notification/notificationActionCreator';
import { useDispatch, useSelector } from 'react-redux';

function NewsletterRegistration() {
  const notificationCtx = useSelector(state => state.notification.notification);
  const dispatch = useDispatch();

  function registrationHandler(values, { setSubmitting }) {
    const enteredEmail = values.email;

    dispatch(
      showNotification({
        title: 'Signing up...',
        message: 'Registering for newsletter.',
        status: 'pending',
      })
    )

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        })
      })
      .then((data) => {
        dispatch(
          showNotification({
            title: 'Success',
            message: 'Successfully registered for newsletter!',
            status: 'success',
          })
        );
        setSubmitting(false);//при получ ответа от сервера, мы разблок кнопку отправки (false - разблок/true - блокир)     
      })
      .catch((error) => {
        dispatch(
          showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error',
          })
        )
      })
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <Formik
        initialValues={{ email: '' }}//аналог setState [email, setEmail] = useState('')
        validate={(values) => {
          const errors = {};
          if (!values.email) {//аналог if (!emailInputRef.current.value)
            errors.email = 'Email is required';
          } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={registrationHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.control}>
              <Field type='email' name='email' placeholder='Your email' aria-label='Your email' />
              <ErrorMessage name='email' component='div' className={styles.error} />
              <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Submitting' : 'Register'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default NewsletterRegistration;
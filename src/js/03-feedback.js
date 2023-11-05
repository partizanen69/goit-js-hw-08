import throttle from 'lodash.throttle';

const formFieldsKey = 'feedback-form-state';

window.onload = () => {
  const formValues = {
    email: '',
    message: '',
  };

  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  try {
    const values = JSON.parse(localStorage.getItem(formFieldsKey)) || {};
    formValues.email = values.email || '';
    formValues.message = values.message || '';
  } catch (err) {
    console.error('Could not parse form data from localstorage', err);
  }

  emailInput.value = formValues.email;
  messageInput.value = formValues.message;

  form.addEventListener(
    'input',
    throttle(e => {
      formValues[e.target.name] = e.target.value;
      localStorage.setItem(formFieldsKey, JSON.stringify(formValues));
    }, 500)
  );

  submitBtn.addEventListener('click', e => {
    e.preventDefault();

    console.log(formValues);

    localStorage.removeItem(formFieldsKey);
    formValues.email = '';
    formValues.message = '';

    emailInput.value = '';
    messageInput.value = '';
  });
};

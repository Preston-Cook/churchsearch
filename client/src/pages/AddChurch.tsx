import background from '../assets/add-church-background.jpg';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import { useTitle } from '../hooks/useTitle';
import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import validator from 'email-validator';
import BASE_API_ENDPOINT from '../config';
import { useLocation } from 'react-router-dom';

export default function AddChurch() {
  useTitle('Add Church');
  const [errors, setErrors] = useState<AddChurchErrors>({} as AddChurchErrors);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [church, setChurch] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const location = useLocation();

  useEffect(
    function () {
      if (location.state?.from !== 'login') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    },
    [location.state?.from]
  );

  async function handleSubmit(e: SyntheticEvent) {
    // Prevent form submission
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    setIsSubmitting(true);

    const errors: AddChurchErrors = {};

    if (!name) {
      errors.name = 'Name Required';
    }

    if (!email) {
      errors.email = 'Email Required';
    } else if (!validator.validate(email)) {
      errors.email = 'Invalid Email';
    }

    if (!church) {
      errors.church = 'Church Required';
    }

    if (!message) {
      errors.message = 'Message Required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    let data;
    try {
      const res = await fetch(`${BASE_API_ENDPOINT}/contact/add-church`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          church,
          message,
        }),
      });
      data = await res.json();

      if (!res.ok) {
        errors.api = data.message;
      }
    } catch {
      errors.api = 'Something Went Wrong';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    setName('');
    setEmail('');
    setChurch('');
    setMessage('');
    setIsSubmitting(false);
    setErrors(errors);
    setSuccess("Success! We'll be in touch!");
  }

  return (
    <div className="relative">
      <img
        className="relative z-0 h-[100vh] w-[1920px] object-cover brightness-100 filter"
        src={background}
        alt="background"
      />
      <div className="absolute left-[50%] top-[50%] w-[80%] max-w-[600px] translate-x-[-50%] translate-y-[-280px] rounded-2xl bg-white px-8 py-6 shadow-2xl">
        <h1 className="pb-2 text-center text-3xl font-semibold text-[#6AAEBD] opacity-100 md:text-4xl">
          Add Your Church
        </h1>
        <hr />
        <div className="space-y-3 pt-2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <label
                htmlFor="name"
                className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              >
                Name
                <input
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  type="text"
                  name="name"
                  aria-describedby="helper-text-explanation"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.name === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.name}
                  </p>
                ) : null}
              </label>
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
              >
                Email
                <input
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  name="email"
                  aria-describedby="helper-text-explanation"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.email === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.email}
                  </p>
                ) : null}
              </label>
            </div>
            <div>
              <label
                htmlFor="church"
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
              >
                Church
                <input
                  value={church}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setChurch(e.target.value)
                  }
                  type="text"
                  name="church"
                  aria-describedby="helper-text-explanation"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.church === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.church}
                  </p>
                ) : null}
              </label>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
                htmlFor="message"
              >
                Message
                <textarea
                  value={message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(e.target.value)
                  }
                  name="message"
                  rows={4}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.message === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.message}
                  </p>
                ) : null}
              </label>
            </div>
            <div className="mt-3 text-center">
              <button
                disabled={isSubmitting}
                className="w-[50%] rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-7 py-1 text-lg text-white border-2 mt-2 hover:border-[#6AAEBD] border-transparent transition-all duration-300"
                type="submit"
              >
                <p className="mx-auto w-fit">
                  {isSubmitting ? <Spinner /> : 'Submit'}
                </p>
              </button>
              {typeof errors.api === 'string' ? (
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp; Error:
                  </span>{' '}
                  {errors.api}
                </p>
              ) : null}
              {success && (
                <p className="mt-2 text-sm text-green-600">{success}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

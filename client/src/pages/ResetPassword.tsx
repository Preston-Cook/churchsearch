import { useLocation, useNavigate } from 'react-router-dom';
import background from '../assets/reset-password-background.jpg';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import { useTitle } from '../hooks/useTitle';
import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BASE_API_ENDPOINT from '../config';

export default function ResetPassword() {
  useTitle('Reset Password');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<ResetPasswordErrors>(
    {} as ResetPasswordErrors
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    const errors: ResetPasswordErrors = {};

    if (!password) {
      errors.password = 'Password Required';
    } else if (password.length < 6) {
      errors.password = 'Password Must Contain at Least 6 Characters';
    }

    if (!confirmation) {
      errors.confirmation = 'Confirmation Required';
    } else if (password && password.length >= 6 && confirmation !== password) {
      errors.confirmation = 'Confirmation Must Match Password';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const pathPieces = location.pathname.split('/');
    const resetPasswordParam = pathPieces[pathPieces.length - 1];

    let data;
    try {
      const res = await fetch(
        `${BASE_API_ENDPOINT}/auth/reset-password/${resetPasswordParam}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password,
          }),
        }
      );
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

    const { first, last, accessToken, email, roles } = data;
    login(first, last, accessToken, email, roles);
    navigate('/');
  }

  return (
    <div className="relative">
      <img
        className="relative z-0 h-[100vh] w-[1920px] object-cover brightness-110 filter"
        src={background}
        alt="background"
      />
      <div className="absolute left-[50%] top-[50%] w-[80%] max-w-[600px] translate-x-[-50%] translate-y-[-270px] rounded-2xl bg-white px-8 py-6 shadow-2xl">
        <h1 className="pb-2 text-center text-3xl font-semibold text-[#6AAEBD] opacity-100 md:text-4xl">
          Reset Password
        </h1>
        <hr />
        <div className="space-y-3 pt-2 pb-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
              >
                Password
                <input
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type="password"
                  name="password"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.password === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.password}
                  </p>
                ) : null}
              </label>
            </div>
            <div>
              <label
                htmlFor="confirmation"
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
              >
                Password Confirmation
                <input
                  value={confirmation}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmation(e.target.value)
                  }
                  type="password"
                  name="confirmation"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.confirmation === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.confirmation}
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
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.api}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

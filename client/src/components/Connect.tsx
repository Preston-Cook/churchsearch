import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';
import { SyntheticEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import validator from 'email-validator';
import BASE_API_ENDPOINT from '../config';

export default function Connect({
  contactType,
  preferredContact,
}: ConnectProps) {
  const [success, setSuccess] = useState<string>('');
  const [errors, setErrors] = useState<ConnectErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pieces = location.pathname.split('/');
  const churchId = pieces[pieces.length - 1];

  async function handleSubmit(e: SyntheticEvent) {
    setIsSubmitting(true);

    const errors: ConnectErrors = {};

    // Prevent form submission
    e.preventDefault();

    if (accessToken === null) {
      navigate('/log-in', { state: { from: churchId } });
      return;
    }

    try {
      const res = await fetch(`${BASE_API_ENDPOINT}/churches/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ churchId }),
      });
      if (!res.ok) {
        throw new Error();
      }
    } catch {
      errors.api = 'Something Went Wrong';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    setErrors(errors);
    setIsSubmitting(false);

    let message;
    if (contactType === 'student') {
      message = 'Successfully Connected! A Student Will Reach out Soon';
    } else {
      message = 'Successfully Connected! A Team Member Will Reach out Soon';
    }
    setSuccess(message);
    return;
  }

  return (
    <div className="border border-[#9AA3AF] w-full rounded-2xl mx-auto text-center p-8 h-[300px]">
      <h2 className="text-[#6AAEBD] text-xl pb-3 font-semibold">
        Get Connected
      </h2>
      <hr className="mx-auto w-[80%]" />
      <p className="my-3 text-[#9AA3AF] w-[80%] mx-auto mt-8">
        Interested in attending? Click the button below, and a{' '}
        <span className="font-semibold">
          {contactType === 'student' ? 'college student' : 'team member'}
        </span>{' '}
        from the church will reach out to you!
      </p>
      {validator.validate(preferredContact) ? (
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={churchId} name="churchId" />
          <button
            className="w-[50%] rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-7 py-1 text-lg text-white border-2 mt-2 hover:border-[#6AAEBD] border-transparent transition-all duration-300 md:mt-6"
            type="submit"
          >
            <p className="mx-auto w-fit font-semibold">
              {isSubmitting ? <Spinner /> : 'Connect'}
            </p>
          </button>
          {typeof errors?.api === 'string' ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                <FontAwesomeIcon icon={faCircleExclamation} />
                &nbsp;Error:
              </span>{' '}
              {errors?.api}
            </p>
          ) : null}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </form>
      ) : (
        <a href={preferredContact} target="_blank">
          <button className="w-[50%] rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-7 py-1 text-lg text-white border-2 mt-2 hover:border-[#6AAEBD] border-transparent transition-all duration-300 md:mt-6">
            Connect
          </button>
        </a>
      )}
    </div>
  );
}

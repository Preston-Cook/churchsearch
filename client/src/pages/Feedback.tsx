import background from '../assets/feedback-background.jpg';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import { useTitle } from '../hooks/useTitle';
import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import BASE_API_ENDPOINT from '../config';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Feedback() {
  useTitle('Feedback');
  const { email: authenticatedEmail } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FeedbackErrors>({} as FeedbackErrors);
  const [email, setEmail] = useState<string>('');
  const [navigation, setNavigation] = useState<string>('');
  const [filters, setFilters] = useState<string>('');
  const [testimonials, setTestimonials] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
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

  useEffect(
    function () {
      setEmail(authenticatedEmail ?? '');
    },
    [authenticatedEmail]
  );

  async function handleSubmit(e: SyntheticEvent) {
    // Prevent form submission
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    const errors: FeedbackErrors = {};

    setIsSubmitting(true);

    if (!email) {
      errors.email = 'Email Required';
    }

    if (
      !navigation &&
      !testimonials &&
      !filters &&
      !feedback &&
      !recommendations
    ) {
      errors.empty = 'At Least One Field Required';
    }

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      setErrors(errors);
      return;
    }

    try {
      const res = await fetch(`${BASE_API_ENDPOINT}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          navigation,
          testimonials,
          filters,
          feedback,
          recommendations,
        }),
      });

      if (!res.ok) {
        errors.api = 'Something Went Wrong';
      }
    } catch {
      errors.api = 'Something Went Wrong';
    }

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      setErrors(errors);
      return;
    }

    if (!authenticatedEmail) {
      setEmail('');
    }
    setNavigation('');
    setTestimonials('');
    setFilters('');
    setFeedback('');
    setRecommendations('');
    setIsSubmitting(false);
    setErrors(errors);
    setSuccess('Feedback Sent!');
  }

  return (
    <div className="relative">
      <img
        className="brightness- relative z-0 h-[100vh] w-[1920px] object-cover filter"
        src={background}
        alt="background"
      />
      <div className="absolute left-[50%] top-[50%] w-[80%] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white px-8 py-6 shadow-2xl overflow-y-scroll h-[70vh]">
        <h1 className="pb-2 text-center text-3xl font-semibold opacity-100 md:text-4xl text-[#6AAEBD]">
          Feedback
        </h1>
        <hr />
        <div className="space-y-3 pt-2">
          <form onSubmit={handleSubmit}>
            <div>
              {!authenticatedEmail && (
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
              )}
              <label
                className={`mb-2 block text-sm font-medium text-[#6AAEBD]`}
                htmlFor="navigation"
              >
                Is ChurchSearch easy to navigate?
                <textarea
                  value={navigation}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setNavigation(e.target.value)
                  }
                  name="navigation"
                  rows={2}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-1 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
                {typeof errors.empty === 'string' ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      &nbsp;Error:
                    </span>{' '}
                    {errors.empty}
                  </p>
                ) : null}
              </label>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
                htmlFor="filters"
              >
                Were any filters confusing?
                <textarea
                  value={filters}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFilters(e.target.value)
                  }
                  name="filters"
                  rows={2}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-1 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
              </label>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
                htmlFor="testimonials"
              >
                Did member testimonials help you?
                <textarea
                  value={testimonials}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setTestimonials(e.target.value)
                  }
                  name="testimonials"
                  rows={2}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-1 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
              </label>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
                htmlFor="recommendations"
              >
                Do you have feature recommendations?
                <textarea
                  value={recommendations}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setRecommendations(e.target.value)
                  }
                  name="recommendations"
                  rows={2}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-1 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
              </label>
            </div>
            <div>
              <label
                className="mb-2 block text-sm font-medium text-[#6AAEBD]"
                htmlFor="feedback"
              >
                General Feedback
                <textarea
                  value={feedback}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFeedback(e.target.value)
                  }
                  name="feedback"
                  rows={2}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-1 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
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
                    &nbsp;Error:
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

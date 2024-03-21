import { FormEvent, useState } from 'react';
import ServiceTimeInput from '../components/ServiceTimeInput';
import {
  ATTENDANCE,
  CONTACT_TYPE,
  DENOMINATIONS,
  MINISTRY,
  PREACHING,
  STATES,
  VIBE,
  WORSHIP,
} from '../utils/constants';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-light-svg-icons';
import validator from 'validator';
import { useAuth } from '../context/AuthContext';
import BASE_API_ENDPOINT from '../config';
import Spinner from '../components/Spinner';

const capitalizeWord = (word: string) => word[0].toUpperCase() + word.slice(1);

const undoCamelCase = (word: string) =>
  word.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });

const REQUIRED_FIELDS = [
  'name',
  'pastorName',
  'pastorBio',
  'street',
  'city',
  'state',
  'zip',
  'churchImages',
  'denomination',
  'attendance',
  'vibe',
  'ministry',
  'preaching',
  'worship',
  'preferredContact',
  'contactType',
];

const BOOLEAN_FIELDS = [
  'serviceOpportunities',
  'missionTrips',
  'counseling',
  'featured',
];

export default function CreateChurch() {
  const { accessToken } = useAuth();
  const [success, setSuccess] = useState<string | undefined>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreateChurchErrors>(
    {} as CreateChurchErrors
  );
  const [serviceTimes, setServiceTimes] = useState<ServiceTimeInput[]>([
    {
      id: 1,
      day: '',
      hour: 0,
      minute: 0,
    },
  ]);

  function handleAddServiceTime() {
    setServiceTimes(prev => {
      return [...prev, { id: prev.length + 1, day: '', hour: 0, minute: 0 }];
    });
  }

  function handleUpdateServiceTime(
    id: number,
    field: string,
    newVal: string | number
  ) {
    setServiceTimes(prev =>
      prev.map(serviceTime => {
        if (serviceTime.id === id) {
          switch (field) {
            case 'day':
              serviceTime.day = newVal as string;
              break;
            case 'hour':
              serviceTime.hour = newVal as number;
              break;
            case 'minute':
              serviceTime.minute = newVal as number;
              break;
          }
        }
        return serviceTime;
      })
    );
  }

  function handleDeleteServiceTime(id: number) {
    setServiceTimes(prev => prev.filter(serviceTime => serviceTime.id !== id));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Prevent form submission
    e.preventDefault();
    setIsSubmitting(true);

    // Clear previous errors
    setSuccess('');
    setErrors({} as CreateChurchErrors);

    const errors: CreateChurchErrors = {} as CreateChurchErrors;

    const formData = new FormData(e.currentTarget);

    REQUIRED_FIELDS.forEach(field => {
      if (!formData.has(field) || !formData.get(field)) {
        errors[field as keyof typeof errors] = `${undoCamelCase(
          field
        )} is Required`;
      } else if (
        field === 'preferredContact' &&
        !validator.isEmail(formData.get(field) as string)
      ) {
        errors.preferredContact = 'Invalid Email';
      }
    });

    // Ensure Images Exist
    if (!(formData.get('pastorImage') as File).name) {
      errors.pastorImage = 'Pastor Image Required';
    }

    if (!(formData.get('churchImages') as File).name) {
      errors.churchImages = 'Church Images Required';
    }

    // Ensure Valid Service Times Number
    if (
      serviceTimes.length === 0 ||
      !Object.values(serviceTimes[0]).every(val => Boolean(val) || val === 0)
    ) {
      errors.serviceTimes = 'Service Times Required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const jsonObj: ServiceTimeJSON[] = [];

    serviceTimes.forEach(serviceTime => {
      const { day, hour, minute } = serviceTime;

      jsonObj.push({
        day,
        hour: hour as number,
        minute: minute as number,
      });
    });

    // Set Service Times
    formData.set('serviceTimes', JSON.stringify(jsonObj));

    // Set Boolean Fields
    BOOLEAN_FIELDS.forEach(field => {
      formData.set(field, `${formData.has(field)}`);
    });

    // Post data to API
    try {
      const res = await fetch(`${BASE_API_ENDPOINT}/churches`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData,
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

    setSuccess('Church Created');
    setIsSubmitting(false);
  }

  return (
    <div className="bg-gradient-to-b from-[#a7d3dd] to-[#e9c4be] py-32">
      <div className="w-[80%] max-w-[600px] bg-white mx-auto rounded-2xl shadow-xl px-8 py-6">
        <h1 className="pb-2 text-center text-3xl font-semibold text-[#6AAEBD] opacity-100 md:text-4xl">
          Create Church
        </h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="name"
            >
              Church Name
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="Church Name"
                name="name"
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
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="pastorName"
            >
              Pastor Name
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="Pastor Name"
                name="pastorName"
              />
              {typeof errors.pastorName === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.pastorName}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="pastorBio"
            >
              Pastor Bio
              <textarea
                rows={4}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="Pastor Biography"
                name="pastorBio"
              />
              {typeof errors.pastorBio === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.pastorBio}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="pastorImage"
            >
              Pastor Image
              <input
                name="pastorImage"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                type="file"
                accept="image/png, image/jpeg"
              />
              {typeof errors.pastorImage === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.pastorImage}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="street"
            >
              Street
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="Street"
                name="street"
              />
              {typeof errors.street === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.street}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="city"
            >
              City
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="City"
                name="city"
              />
              {typeof errors.city === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.city}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="state"
            >
              State
              <select
                name="state"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                <option value="">Choose a State</option>
                {STATES.map((state, i) => (
                  <option className="text-gray-500" key={i} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {typeof errors.state === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.state}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="zip"
            >
              Zip Code
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="Zip Code"
                name="zip"
              />
              {typeof errors.zip === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.zip}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="churchImages"
            >
              Church Images
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                multiple
                name="churchImages"
                type="file"
                accept="image/png, image/jpeg"
              />
              {typeof errors.churchImages === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.churchImages}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="serviceTimes"
            >
              Service Times: Day, Hour (24 Hour Time), Minute
              {serviceTimes.map((serviceTime, i) => (
                <ServiceTimeInput
                  key={i}
                  day={serviceTime.day}
                  hour={serviceTime.hour}
                  minute={serviceTime.minute}
                  id={serviceTime.id}
                  onChange={handleUpdateServiceTime}
                  onDelete={handleDeleteServiceTime}
                />
              ))}
              <div className="text-center mt-3">
                <Button onClick={handleAddServiceTime}>Add Service Time</Button>
              </div>
              {typeof errors.serviceTimes === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.serviceTimes}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="denomination"
            >
              Denomination
              <select
                multiple
                name="denomination"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                {DENOMINATIONS.map((denomination, i) => (
                  <option
                    className="text-gray-500"
                    key={i}
                    value={denomination}
                  >
                    {denomination}
                  </option>
                ))}
              </select>
              {typeof errors.denomination === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.pastorBio}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="attendance"
            >
              Attendance
              <select
                name="attendance"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                <option value="">Select an Attendance</option>
                {ATTENDANCE.map((attendance, i) => (
                  <option className="text-gray-500" key={i} value={attendance}>
                    {attendance}
                  </option>
                ))}
              </select>
              {typeof errors.attendance === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.attendance}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="vibe"
            >
              Vibe
              <select
                name="vibe"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                <option value="">Select a Vibe</option>
                {VIBE.map((vibe, i) => (
                  <option className="text-gray-500" key={i} value={vibe}>
                    {vibe}
                  </option>
                ))}
              </select>
              {typeof errors.vibe === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.vibe}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="ministry"
            >
              Ministry
              <select
                name="ministry"
                multiple
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                {MINISTRY.map((ministry, i) => (
                  <option className="text-gray-500" key={i} value={ministry}>
                    {ministry}
                  </option>
                ))}
              </select>
              {typeof errors.ministry === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.ministry}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="preaching"
            >
              Preaching
              <select
                name="preaching"
                multiple
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                {PREACHING.map((preaching, i) => (
                  <option className="text-gray-500" key={i} value={preaching}>
                    {preaching}
                  </option>
                ))}
              </select>
              {typeof errors.preaching === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.preaching}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="worship"
            >
              Worship
              <select
                name="worship"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                <option value={''}>Select a Worship Style</option>
                {WORSHIP.map((worship, i) => (
                  <option className="text-gray-500" key={i} value={worship}>
                    {worship}
                  </option>
                ))}
              </select>
              {typeof errors.worship === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.worship}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="serviceOpportunities"
            >
              Service Opportunities
              <br />
              <input
                name="serviceOpportunities"
                className="mt-3 w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
                type="checkbox"
              />
              <label
                htmlFor="serviceOpportunities"
                className="text-gray-500 text-sm"
              >
                &nbsp;&nbsp;Has Service Opportunities
              </label>
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mt-3 mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="missionTrips"
            >
              Mission Trips
              <br />
              <input
                name="missionTrips"
                className="mt-3 w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
                type="checkbox"
              />
              <label htmlFor="counseling" className="text-gray-500 text-sm">
                &nbsp;&nbsp;Has Mission Trips
              </label>
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mt-3 mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="counseling"
            >
              Counseling
              <br />
              <input
                name="counseling"
                className="mt-3 w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
                type="checkbox"
              />
              <label htmlFor="counseling" className="text-gray-500 text-sm">
                &nbsp;&nbsp;Has Counseling
              </label>
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mt-3 mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="featured"
            >
              Featured
              <br />
              <input
                name="featured"
                className="mt-3 w-4 h-4 text-[#6AAEBD] bg-gray-100 border-gray-300 rounded accent-[#6AAEBD]"
                type="checkbox"
              />
              <label htmlFor="featured" className="text-gray-500 text-sm">
                &nbsp;&nbsp;Featured
              </label>
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="preferredContact"
            >
              Preferred Contact
              <input
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                placeholder="Preferred Contact"
                name="preferredContact"
              />
              {typeof errors.preferredContact === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.preferredContact}
                </p>
              ) : null}
            </label>
          </div>
          <div className="flex justify-center my-3">
            <label
              className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
              htmlFor="worship"
            >
              Contact Type
              <select
                name="contactType"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
              >
                <option value={''}>Select a Contact Type</option>
                {CONTACT_TYPE.map((contactType, i) => (
                  <option className="text-gray-500" key={i} value={contactType}>
                    {capitalizeWord(contactType)}
                  </option>
                ))}
              </select>
              {typeof errors.contactType === 'string' ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    &nbsp;Error:
                  </span>{' '}
                  {errors.contactType}
                </p>
              ) : null}
            </label>
          </div>
          <div className="mt-3 text-center">
            <button
              className="w-[50%] rounded-full bg-gradient-to-r from-[#a7d3dd] to-[#f9bab1] px-7 py-1 text-lg text-white border-2 mt-2 hover:border-[#6AAEBD] border-transparent transition-all duration-300"
              type="submit"
            >
              <p className="mx-auto w-fit font-semibold">
                {isSubmitting ? <Spinner /> : 'Submit'}
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
            {success && (
              <p className="mt-2 text-sm text-green-600">{success}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

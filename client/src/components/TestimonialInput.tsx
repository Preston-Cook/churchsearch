import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/pro-light-svg-icons';
import Spinner from './Spinner';

export default function TestimonialInput({
  testimonials,
  onAddTestimonial,
  onDeleteTestimonial,
  onUpdateTestimonial,
  onSaveTestimonial,
  successMsg,
  isSubmitting,
}: TestimonialInputProps) {
  return (
    <>
      {testimonials?.map((testimonial, i) => (
        <div key={i}>
          <div>
            <h2 className="pb-2 text-center text-lg font-semibold text-[#6AAEBD] opacity-100 md:text-2xl mt-3">
              Testimonial {i + 1}
            </h2>
            <div className=" text-center my-3">
              <Button
                onClick={() => onDeleteTestimonial(testimonial.id as string)}
              >
                Delete Testimonial&nbsp;&nbsp;
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
            <div className="flex justify-center my-3">
              <label
                className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
                htmlFor="community"
              >
                Community
                <textarea
                  rows={4}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                  placeholder="Pastor Biography"
                  name="community"
                  value={testimonial.community}
                  onChange={e => {
                    const { name, value } = e.target;
                    onUpdateTestimonial(testimonial.id as string, name, value);
                  }}
                />
              </label>
            </div>
            <div className="flex justify-center my-3">
              <label
                className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
                htmlFor="denomination"
              >
                Denomination
                <textarea
                  rows={4}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                  placeholder="Pastor Biography"
                  name="denomination"
                  value={testimonial.denomination}
                  onChange={e => {
                    const { name, value } = e.target;
                    onUpdateTestimonial(testimonial.id as string, name, value);
                  }}
                />
              </label>
            </div>
            <div className="flex justify-center my-3">
              <label
                className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
                htmlFor="preaching"
              >
                Preaching
                <textarea
                  rows={4}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                  placeholder="Pastor Biography"
                  name="preaching"
                  value={testimonial.preaching}
                  onChange={e => {
                    const { name, value } = e.target;
                    onUpdateTestimonial(testimonial.id as string, name, value);
                  }}
                />
              </label>
            </div>
            <div className="flex justify-center my-3">
              <label
                className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
                htmlFor="worship"
              >
                Worship
                <textarea
                  value={testimonial.worship}
                  rows={4}
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                  placeholder="Pastor Biography"
                  name="worship"
                  onChange={e => {
                    const { name, value } = e.target;
                    onUpdateTestimonial(testimonial.id as string, name, value);
                  }}
                />
              </label>
            </div>
            <div className="flex justify-center my-3">
              <label
                className="mb-2 block flex-1 text-sm font-medium text-[#6AAEBD]"
                htmlFor="name"
              >
                Name
                <input
                  value={testimonial.name}
                  onChange={e => {
                    const { name, value } = e.target;
                    onUpdateTestimonial(testimonial.id as string, name, value);
                  }}
                  type="text"
                  name="name"
                  aria-describedby="helper-text-explanation"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
                />
              </label>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center my-3">
        <Button onClick={onSaveTestimonial}>
          {isSubmitting ? (
            <Spinner />
          ) : (
            <>
              Save Changes&nbsp;&nbsp;
              <FontAwesomeIcon icon={faEdit} />
            </>
          )}
        </Button>
        {successMsg && (
          <p className="mt-2 text-sm text-green-600">{successMsg}</p>
        )}
      </div>
      <hr />
      <div className="text-center mt-3">
        <Button onClick={onAddTestimonial}>Add Testimonial</Button>
      </div>
    </>
  );
}

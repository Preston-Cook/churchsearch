import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { DAYS } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ServiceTimeInput({
  id,
  day,
  hour,
  minute,
  onDelete,
  onChange,
}: ServiceTimeInputProps) {
  return (
    <div className="flex justify-between">
      <select
        name={'day'}
        value={day}
        className="mt-2 block w-[40%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
        onChange={e => onChange(id, e.target.name, e.target.value)}
      >
        <option value="">Choose a Day</option>
        {DAYS.map((day, i) => (
          <option className="text-gray-500" key={i} value={day}>
            {day}
          </option>
        ))}
      </select>
      <input
        className="mt-2 w-[25%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
        placeholder="Hour"
        type="number"
        value={hour}
        min={0}
        max={23}
        name={'hour'}
        onChange={e => onChange(id, e.target.name, e.target.value)}
      />
      <input
        className="mt-2 w-[25%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-[#6AAEBD] focus:outline-none focus:ring-0 focus:ring-[#6AAEBD]"
        placeholder="Minute"
        type="number"
        value={minute}
        min={0}
        max={59}
        name={'minute'}
        onChange={e => onChange(id, e.target.name, e.target.value)}
      />
      <div className="flex flex-end">
        <FontAwesomeIcon
          onClick={() => onDelete(id)}
          style={{ cursor: 'pointer', marginTop: '15px' }}
          icon={faTrash}
          size="xl"
        />
      </div>
    </div>
  );
}

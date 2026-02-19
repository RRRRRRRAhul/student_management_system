import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { useRef } from "react";

const CourseCreateForm = ({ handleSubmit }) => {
  const courseName = useRef("");
  const duration = useRef("");
  const code = useRef("");
  const durations = [
    { label: "24 months", value: 24 },
    { label: "36 months", value: 36 },
    { label: "48 months", value: 48 },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const courseData = {
          name: courseName.current.value,
          code: code.current.value.toUpperCase(),
          duration: Number(duration.current.value),
        };
        handleSubmit(courseData);
        courseName.current.value = "";
        code.current.value = "";
        duration.current.value = "";
      }}
      className="bg-white p-6 rounded-xl shadow space-y-5 w-full max-w-lg"
    >
      <Input
        label="Course Name"
        type="text"
        className="w-full"
        ref={courseName}
      />

      <Input label="Course Code" type="text" className="w-full" ref={code} />

      <Select label="Course Duration" className="w-full" ref={duration}>
        <option value="">Select duration</option>
        {durations.map((duration) => (
          <option key={duration.value} value={duration.value}>
            {duration.label}
          </option>
        ))}
      </Select>

      <Button type="submit" className="w-full">
        Save Course
      </Button>
    </form>
  );
};

export default CourseCreateForm;

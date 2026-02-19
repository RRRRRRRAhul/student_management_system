import { useRef } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const StudentForm = ({ handleSubmit, courses }) => {
  const name = useRef("");
  const course = useRef("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(name.current.value, course.current.value);
      }}
      className="bg-white w-full max-w-lg rounded-2xl shadow-md px-8 py-7 space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Student Application
      </h2>

      
      <Input
        label="Student Name"
        type="text"
        placeholder="Enter student name"
        className="w-full"
        ref={name}
      />

      
      <Select
        label="Course"
        className="w-full"
        ref={course}
      >
        <option value="">Select course</option>
        {courses?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium"
      >
        Submit Application
      </Button>
    </form>
  );
};

export default StudentForm;

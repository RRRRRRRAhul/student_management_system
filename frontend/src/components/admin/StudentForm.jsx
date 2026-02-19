import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { useRef } from "react";

const StudentForm = ({ defaultValues = {}, handleSubmit, courses }) => {
  const name = useRef(defaultValues.name || "");
  const email = useRef(defaultValues.email || "");
  const course = useRef(defaultValues.course?.id ?? defaultValues.course ?? "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.current.value || !email.current.value) {
          alert("Name and email are required");
          return;
        }
        const studentData = {
          name: name.current.value,
          email: email.current.value,
          course: Number(course.current.value),
        };
        handleSubmit(studentData);
        alert("Student saved successfully!");
      }}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <Input
        label="Student Name"
        type="text"
        defaultValue={defaultValues.name}
        ref={name}
      />

      <Input
        label="Email"
        type="email"
        defaultValue={defaultValues.email}
        ref={email}
      />

      <Select
        label="Course"
        defaultValue={defaultValues.course?.id ?? defaultValues.course ?? ""}
        ref={course}
      >
        {courses &&
          courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </Select>

      <Button type="submit" className="w-full">
        Save Student
      </Button>
    </form>
  );
};

export default StudentForm;

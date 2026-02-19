import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const CourseUpdateForm = ({ handleSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    duration: "",
    is_active: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        code: initialData.code || "",
        duration: initialData.duration || "",
        is_active: initialData.is_active || false,
      });
    }
  }, [initialData]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "code"
          ? value.toUpperCase()
          : type === "checkbox"
            ? checked
            : value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(initialData.id, {
          ...form,
          duration: Number(form.duration),
        });
      }}
      className="bg-white p-6 rounded-xl shadow space-y-5 w-full max-w-lg"
    >
      <Input
        label="Course Name"
        name="name"
        value={form.name}
        onChange={onChange}
      />

      <Input
        label="Course Code"
        name="code"
        value={form.code}
        onChange={onChange}
      />

      <Input
        label="Duration (months)"
        type="number"
        name="duration"
        value={form.duration}
        onChange={onChange}
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={onChange}
          className="h-4 w-4"
        />
        <label className="text-gray-700 font-medium">Active Course</label>
      </div>

      <Button type="submit" className="w-full">
        Update Course
      </Button>
    </form>
  );
};

export default CourseUpdateForm;

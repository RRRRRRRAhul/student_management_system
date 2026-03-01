import { useSelector, useDispatch } from "react-redux";
import { getMarks } from "../../../features/marks/markApi";
import { selectMarks } from "../../../features/marks/markSelector";
import { useEffect } from "react";
import { updateMark } from "../../../features/marks/markApi";

const MarksList = () => {
    const dispatch = useDispatch()
    const marks = useSelector(selectMarks)

    useEffect(() => {
        dispatch(getMarks())
    },[dispatch])

    const handlePublishMarks = async (id) => {
      const publishMark = {
        is_published: true
      }
      const response = await dispatch(updateMark(id, publishMark))
      if (response.success){
        alert("Marks is published successfully")
      }else{
        alert("Sorry, there is a roblem!")
      }
    }

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Marks List
        </h1>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Student</th>
                <th className="text-left px-4 py-3">Subject</th>
                <th className="text-left px-4 py-3">Exam</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Totak Marks</th>
                <th className="text-left px-4 py-3">Marks</th>
                <th className="text-left px-4 py-3">Attendance</th>
              </tr>
            </thead>

            <tbody>
              {marks.map((mark) => (
                <tr
                  key={mark.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {mark.student_name}
                  </td>

                  <td className="px-4 py-3">
                    {mark.subject_name}
                  </td>

                  <td className="px-4 py-3">
                    {mark.exam_name}
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                      {mark.exam_type}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {mark.max_marks}
                  </td>

                  <td className="px-4 py-3">
                    {mark.is_absent
                      ? "-"
                      : `${mark.marks_obtained}`}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        mark.is_absent
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {mark.is_absent ? "Absent" : "Present"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarksList;
import { marksByStudent } from "../../../features/marks/markApi";
import { useSelector, useDispatch } from "react-redux";
import { selectMarks } from "../../../features/marks/markSelector";
import { useEffect } from "react";


const StudentMarksList = () => {
    const dispatch = useDispatch();
    const marks = useSelector(selectMarks);
    console.log(marks);

    useEffect(() => {
        dispatch(marksByStudent());
    },[dispatch])

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Marks</h1>

        {marks.length === 0 ? (
          <p className="text-gray-500">No marks available.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Subject</th>
                  <th className="text-left px-4 py-3">Exam</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Marks</th>
                  <th className="text-left px-4 py-3">Max Marks</th>
                  <th className="text-left px-4 py-3">Attendance</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {marks.map((mark) => {
                  const percentage =
                    (mark.marks_obtained / mark.max_marks) * 100;
                  const isPass = percentage >= 40;

                  return (
                    <tr key={mark.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        {mark.subject_name}
                      </td>

                      <td className="px-4 py-3">{mark.exam_name}</td>

                      <td className="px-4 py-3 capitalize">{mark.exam_type}</td>

                      {/* Marks Obtained */}
                      <td className="px-4 py-3">
                        {mark.is_absent ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          mark.marks_obtained
                        )}
                      </td>

                      {/* Max Marks */}
                      <td className="px-4 py-3">{mark.max_marks}</td>

                      {/* Attendance */}
                      <td className="px-4 py-3">
                        {mark.is_absent ? (
                          <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                            Absent
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                            Present
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {mark.is_absent ? (
                          <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                            Fail
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                            Pass
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMarksList;

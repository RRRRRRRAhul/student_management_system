import { use, useState } from "react";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import { useSelector } from "react-redux";
import {
  getApplications,
  processApplication,
} from "../../features/applications/applicationApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  selectApplications,
  selectApplicationLoading,
  selectApplicationError,
} from "../../features/applications/applicationSelector";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";

const ApplicationList = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applications = useSelector(selectApplications);
  const loading = useSelector(selectApplicationLoading);
  const error = useSelector(selectApplicationError);

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const handleApprove = async (id) => {
    await dispatch(
      processApplication(id, {
        choices: "approve",
        remarks: "Approved by admin",
      }),
    );
    navigate(`/admin/students`);
  };

  const handleReject = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const confirmReject = async () => {
    await dispatch(
      processApplication(selectedId, {
        choices: "reject",
        remarks: "Rejected by admin",
      }),
    );
    setOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Student Applications</h1>

      {loading && <Loader />}
      {error && <p className="text-red-500">Error: {error}</p>}

      {applications && !loading && !error && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="px-4 py-2">{app.full_name}</td>
                  <td className="px-4 py-2">{app.email || "N/A"}</td>
                  <td className="px-4 py-2">{app.course_name || "N/A"}</td>
                  <td className="px-4 py-2 capitalize">
                    <span className="text-yellow-600 font-medium">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    {app.status === "approved" && (
                      <span className="text-green-600">Approved</span>
                    )}
                    {app.status === "rejected" && (
                      <span className="text-red-600">Rejected</span>
                    )}
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(app.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmReject}
        title="Reject Application"
        description="Are you sure you want to reject this application?"
      />
    </>
  );
};

export default ApplicationList;

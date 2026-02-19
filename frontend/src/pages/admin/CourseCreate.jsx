import  CourseCreateForm  from "../../components/admin/CourseCreateForm"
import { useDispatch } from "react-redux"
import { createCourse } from "../../features/courses/courseApi"

const CourseCreate = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (courseData) => {
    await dispatch(createCourse(courseData))
  }
  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-start pt-10">
      <CourseCreateForm handleSubmit={handleSubmit}/>
    </div>
  )
}

export default CourseCreate
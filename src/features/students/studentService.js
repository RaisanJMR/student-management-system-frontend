import axios from 'axios'
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/students`

// Get Student List
const getStudents = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Add new student
const AddStudent = async (student, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(
        API_URL,
        student,
        config
    )
    return response.data
}

// Update student
const updateStudent = async (student, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(
        `${API_URL}/${student._id}`,
        student,
        config
    )
    return response.data
}

// Delete student
const deleteStudent = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(
        `${API_URL}/${id}`,
        config
    )
    return response.data
}


const studentService = {
    getStudents,
    AddStudent,
    updateStudent,
    deleteStudent
}

export default studentService
import axios from 'axios'
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`

// Get user List
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Add new user
const AddUser = async (user, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(
        API_URL,
        user,
        config
    )
    return response.data
}

// Update user
const updateUser = async (user, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(
        `${API_URL}/${user._id}`,
        user,
        config
    )
    return response.data
}

// Delete user
const deleteUser = async (id, token) => {
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


const userService = {
    getUsers,
    AddUser,
    updateUser,
    deleteUser
}

export default userService

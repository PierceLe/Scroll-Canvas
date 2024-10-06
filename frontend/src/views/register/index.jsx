// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { FaSun, FaMoon, FaDownload } from 'react-icons/fa';
import './index.css'; // Import CSS file

export default function Register() {
    const [darkMode, setDarkMode] = useState(false);
    const [notes, setNotes] = useState(""); // State for notes
    const [errors, setErrors] = useState({}); // State for storing validation errors

    // Single state object for user data
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: "",
        password: "",
        status: 1,
    });

    // Update user state when any input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });

        const updatedErrors = validateData(name, value);
        setErrors({
            ...errors,
            ...updatedErrors, // Merge the updated errors for that field into the existing error state
        });
    };

    const validateData = (name, value) => {
        const validationErrors = {};

        switch (name) {
            case "firstName":
                if (!value) {
                    validationErrors.firstName = "First name cannot be empty";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    validationErrors.firstName = "First name must contain only alphabetic characters";
                } else {
                    validationErrors.firstName = null; // Clear the error if valid
                }
                break;

            case "lastName":
                if (!value) {
                    validationErrors.lastName = "Last name cannot be empty";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    validationErrors.lastName = "Last name must contain only alphabetic characters";
                } else {
                    validationErrors.lastName = null;
                }
                break;

            case "email":
                if (!value) {
                    validationErrors.email = "Email cannot be empty";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    validationErrors.email = "Email is not in the correct form";
                } else {
                    validationErrors.email = null;
                }
                break;

            case "password":
                if (!value) {
                    validationErrors.password = "Password cannot be empty";
                } else if (value.length < 8) {
                    validationErrors.password = "Password must be at least 8 characters long";
                } else if (value.length > 20) {
                    validationErrors.password = "Password must be no longer than 20 characters long";
                } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_\s\t]).{8,20}$/.test(value)) {
                    validationErrors.password = "Password must contain at least one digit, one uppercase and lowercase letter, one special character, and may include spaces or tabs";
                } else {
                    validationErrors.password = null;
                }
                break;

            case "username":
                if (!value) {
                    validationErrors.username = "Username cannot be empty";
                } else {
                    validationErrors.username = null;
                }
                break;

            case "phone":
                if (!value) {
                    validationErrors.phone = "Phone number cannot be empty";
                } else {
                    validationErrors.phone = null;
                }
                break;

            default:
                break;
        }

        return validationErrors;
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode); // Save theme preference in localStorage
    };

    // Set the initial mode based on system preference or stored preference
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true');
        } else {
            setDarkMode(systemPrefersDark);
        }
    }, []);

    // Handle downloading the notes as a .txt file
    const handleDownloadNotes = () => {
        const element = document.createElement("a");
        const file = new Blob([notes], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "notes.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    // Validation logic for form submission
    const validateForm = () => {
        const newErrors = {};

        Object.keys(user).forEach((field) => {
            const fieldErrors = validateData(field, user[field]);
            if (fieldErrors[field]) {
                newErrors[field] = fieldErrors[field];
            }
        });

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set the errors if validation fails
        } else {
            // Send the user data to the backend
            try {
                const response = await fetch('https://your-backend-api-link/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Registration successful:", data);
                } else {
                    const errorData = await response.json();
                    console.error("Error registering user:", errorData);
                }
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        }
    };

    return (
        <div className={`grid grid-cols-2 h-screen ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Left side - Notes */}
            <div className="notes-container">
                <div className="text-center">
                    <textarea
                        className="notes-textarea"
                        placeholder="Write your notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button onClick={handleDownloadNotes} className="download-btn" title="Download Notes">
                        <FaDownload />
                    </button>
                </div>
            </div>

            {/* Right side - Registration Form */}
            <div className="form-container">
                <form className="form-box" onSubmit={handleSubmit}>
                    <h3 className="form-title">Join Scrolling System</h3>

                    {/* Dark Mode Toggle */}
                    <div className="dark-mode-toggle">
                        <button type="button" onClick={toggleDarkMode} className="dark-mode-btn">
                            {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
                        </button>
                    </div>

                    {/* First Name */}
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                            prefix={<UserOutlined />}
                            value={user.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                            prefix={<UserOutlined />}
                            value={user.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            prefix={<MailOutlined />}
                            value={user.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            prefix={<UserOutlined />}
                            value={user.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            prefix={<PhoneOutlined />}
                            value={user.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input.Password
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            prefix={<LockOutlined />}
                            value={user.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`submit-btn ${darkMode ? 'dark-submit-btn' : 'light-submit-btn'}`}
                    >
                        Create Account
                    </button>

                    {/* Add message for existing users */}
                    <p className="existing-user-msg">
                        Already a member? <a href="/login" className="login-link">Click here to login</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../src/utils/mutations";
import Auth from "../../src/utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false, // Default to false unless specified
  });

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox for isAdmin
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createUser({
        variables: { input: formState }, // Matches your GraphQL schema
      });

      if (data?.createUser?.token) {
        Auth.login(data.createUser.token); // Store token in localStorage
      }
    } catch (e) {
      console.error("Signup Error:", e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="form-container">
        <div className="form-header">
          <h4>Sign Up</h4>
        </div>
        <div className="form-body">
          {data ? (
            <p>
              Success! You may now head <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formState.isAdmin}
                  onChange={handleChange}
                />
                Register as Admin
              </label>
              <button className="btn-submit" type="submit">
                Submit
              </button>
            </form>
          )}

          {error && <div className="error-message">{error.message}</div>}
        </div>
      </div>
    </main>
  );
};

export default Signup;

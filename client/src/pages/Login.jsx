// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../utils/mutations';
// import Auth from '../../utils/auth';

// const Login = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <main className="flex-row justify-center mb-4">
//       <div className="form-container">
//         <div className="form-header">
//           <h4>Login</h4>
//         </div>
//         <div className="form-body">
//           {data ? (
//             <p>
//               Success! You may now head <Link to="/">back to the homepage.</Link>
//             </p>
//           ) : (
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 className="form-input"
//                 placeholder="Your email"
//                 name="email"
//                 type="email"
//                 value={formState.email}
//                 onChange={handleChange}
//               />
//               <input
//                 className="form-input"
//                 placeholder="******"
//                 name="password"
//                 type="password"
//                 value={formState.password}
//                 onChange={handleChange}
//               />
//               <button
//                 className="btn-submit"
//                 type="submit"
//               >
//                 Submit
//               </button>
//             </form>
//           )}

//           {error && (
//             <div className="error-message">
//               {error.message}
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Login;
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // Handles input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Handles form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token); // Store token & redirect
    } catch (e) {
      console.error("Login failed", e);
    }

    // Clear form
    setFormState({ email: "", password: "" });
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h4 className="text-xl font-semibold mb-4">Login</h4>

        <form onSubmit={handleFormSubmit}>
          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 mt-3">{error.message}</p>}

        <p className="mt-4">
          New here? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;


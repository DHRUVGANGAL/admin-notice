// // services/authService.js
// import { API_URL } from '../config';

// export const login = async (email, password) => {
//     try {
//       const response = await fetch(`${API_URL}/admin/signin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });
      
//       return await response.json();
//     } catch (error) {
//       throw error;
//     }
//   };

// export const register = async (userData) => {
//   try {
//     const response = await fetch(`${API_URL}/admin/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     });
    
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// };



// export {
//   API_URL
// };





// services/authService.js
import { API_URL } from '../config';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/admin/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};




export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/admin/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};


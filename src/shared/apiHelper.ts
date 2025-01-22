import { ProfileSuccess, User, RequestError, UserSuccess } from "./types";

export const registerUser = async (user: User): Promise<UserSuccess> => {
    const response = await fetch('https://backend-ashen-seven-22.vercel.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
        const error: RequestError = await response.json();
        throw new Error(error.message);
    }

    const data: UserSuccess = await response.json();
    return data;
};

export const profileUser = async (token: string): Promise<ProfileSuccess> => {
    const response = await fetch('https://backend-ashen-seven-22.vercel.app/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });
    
      if (!response.ok) {
        const error: RequestError = await response.json();
        throw new Error(error.message);
      }
      const data: ProfileSuccess = await response.json();
      return data;
};

export const loginUser = async (user: User): Promise<UserSuccess> => {
    const response = await fetch('https://backend-ashen-seven-22.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    
      if (!response.ok) {
        const error: RequestError = await response.json();
        throw new Error(error.message);
      }
      const data: UserSuccess = await response.json();
      return data;
}
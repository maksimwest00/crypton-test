
export const SaveJWTToken = (jwtToken: string) => {
    localStorage.setItem('jwtToken', jwtToken);
};

export const ReadJWTToken = (): string | null => {
    return localStorage.getItem('jwtToken');
};

export const ClearJWTToken = () => {
    localStorage.removeItem('jwtToken');
};
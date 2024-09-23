export const loginGuard = () => {
    return (localStorage.getItem('session_token'))? true: false;
}
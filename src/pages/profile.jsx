import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
      <div>
        <h1> Hola soy el Profile de {username}</h1>

      </div>
    );
  }
  export default Profile;
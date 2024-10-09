import { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'aplication/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            alert('Usuario creado con éxito');
        } else {
            alert('Error al crear el usuario');
        }
    };
    return (
        <div>
            <h1>Registro</h1>
            <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Registrarse</button>
        </div>
    );
};



export default Signup;
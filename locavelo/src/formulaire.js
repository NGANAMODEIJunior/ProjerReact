import React, { useState } from 'react';

const LoginForm = () => {
    const [idVelo, setIdVelo] = useState('123456'); // Valeur fictive pour simuler l'ID du vélo
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [codeRetour, setCodeRetour] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation des identifiants (exemple basique)
        if (idVelo !== '' && nom !== '' && prenom !== '' && telephone !== '' && codeRetour !== '') {
            // Redirection vers la page d'accueil si la connexion est réussie
            window.location.href = '/accueil';
        } else {
            // Affichage d'un message d'erreur si les identifiants sont incorrects
            setErrorMessage('Veuillez remplir tous les champs.');
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="idVelo">ID Vélo :</label>
                <input
                    type="text"
                    id="idVelo"
                    value={idVelo}
                    onChange={(e) => setIdVelo(e.target.value)}
                    required
                />
                <label htmlFor="nom">Nom :</label>
                <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
                <label htmlFor="prenom">Prénom :</label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                />
                <label htmlFor="telephone">Téléphone :</label>
                <input
                    type="text"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                />
                <label htmlFor="codeRetour">Code de Retour :</label>
                <input
                    type="text"
                    id="codeRetour"
                    value={codeRetour}
                    onChange={(e) => setCodeRetour(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;

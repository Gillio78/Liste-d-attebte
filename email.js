document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    if (validateEmail(email)) {
        fetch('http://localhost:3306/insertEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Votre email a été envoyé avec succès!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Une erreur s\'est produite lors de l\'envoi de votre email.');
        });
    } else {
        alert('Veuillez entrer une adresse email valide.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Show/hide pages
function showCertificate() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('certificate-page').style.display = 'block';
}

function showHome() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('certificate-page').style.display = 'none';
}

// Generate certificate
document.getElementById('certForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const certification = document.getElementById('certification').value;
    
    // Update certificate
    document.getElementById('cert-name').textContent = name;
    document.getElementById('cert-title').textContent = certification;
    
    // Set date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('cert-date').textContent = formattedDate;
    
    // Generate unique certificate ID
    const certId = 'CERT-' + generateRandomId(10).toUpperCase();
    document.getElementById('cert-id').textContent = 'Certificate ID: ' + certId;
    
    // Show certificate page
    showCertificate();
});

// Share functionality
document.getElementById('shareBtn').addEventListener('click', function() {
    const name = document.getElementById('cert-name').textContent;
    const certification = document.getElementById('cert-title').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: `${name}'s Certificate in ${certification}`,
            text: `View my professional certificate in ${certification}`,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            copyToClipboard(window.location.href);
        });
    } else {
        copyToClipboard(window.location.href);
    }
});

// Helper functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
<script>
    function getParameterByName(name) {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function decrypt(encodedUrl) {
        return atob(encodedUrl);
    }

    function startProgress() {
        let encryptedUrl = getParameterByName('url');
        let destinationUrl = decrypt(encryptedUrl);

        let progressBar = document.getElementById('progress-bar');
        let buttonElement = document.getElementById('redirect-button');

        let width = 0;
        let interval = setInterval(function() {
            if (width >= 100) {
                clearInterval(interval);
                progressBar.textContent = 'VERIFICATION COMPLETE';
                buttonElement.style.display = 'inline-block'; // Show the button
            } else {
                width++;
                progressBar.style.width = width + '%';
                progressBar.textContent = width + '%';
            }
        }, 50);

        buttonElement.onclick = function() {
            window.location.href = destinationUrl;
        };
    }

    document.addEventListener('DOMContentLoaded', startProgress);
</script>
<script>
    // Function to encrypt URLs
    function encrypt(url) {
        return btoa(url);
    }

    // List of domains to exclude from redirection
    const excludedDomains = ['t.me', 'wa.me', 'whatsapp.com', 'zedalbums.top', 'zedalbums.blogspot.com'];

    document.addEventListener('DOMContentLoaded', function() {
        let links = document.querySelectorAll('a');
        links.forEach(function(link) {
            let url = link.getAttribute('href');
            let shouldEncrypt = true;

            if (url && url.startsWith('http')) {
                // Check if the URL matches any excluded domains
                for (let domain of excludedDomains) {
                    if (url.includes(domain)) {
                        shouldEncrypt = false;
                        break;
                    }
                }

                if (shouldEncrypt) {
                    let encryptedUrl = encrypt(url);
                    link.setAttribute('href', '/p/safelink-page.html?url=' + encryptedUrl);
                }
            }
        });
    });
</script>



const content = {
    'en': {
        greeting: 'Hello, World!',
        description: 'Welcome to our website!'
    },
    'uk': {
        greeting: 'Привіт, світ!',
        description: 'Ласкаво просимо на наш веб-сайт!'
    }
};

$(document).ready(function() {

    // Attach the changeLanguage function to the change event of the dropdown
    $('#language-select').on('change', changeLanguage);

    // Initial content update when the page loads
    changeLanguage();
});

function changeLanguage() {
    var selectedLanguage = $('#language-select').val();

    // Update content based on the selected language using jQuery
    $('#greeting').text(content[selectedLanguage].greeting);
    $('#description').text(content[selectedLanguage].description);
}
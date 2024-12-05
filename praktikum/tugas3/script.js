const inputField = document.getElementById('inputField');
const displayText = document.getElementById('displayText');

inputField.addEventListener('keydown', function(event) {
    // Tampilkan karakter terakhir yang ditekan
    displayText.textContent = event.key;
});

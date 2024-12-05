const hoverText = document.getElementById('hoverText');

hoverText.addEventListener('mouseover', function () {
    hoverText.style.backgroundColor = 'aqua';
});

hoverText.addEventListener('mouseout', function () {
    hoverText.style.backgroundColor = '';
});
// Tangkap elemen input, tombol, dan daftar
const inputField = document.getElementById('itemInput');
const addButton = document.getElementById('addItemButton');
const itemList = document.getElementById('itemList');

// Tambahkan event listener ke tombol
addButton.addEventListener('click', function() {
    // Ambil nilai dari input field
    const newItemText = inputField.value;

    // Validasi: cek apakah input tidak kosong
    if (newItemText.trim() !== '') {
        // Buat elemen <li> baru
        const listItem = document.createElement('li');
        listItem.textContent = newItemText;

        // Tambahkan elemen <li> ke dalam <ul>
        itemList.appendChild(listItem);

        // Kosongkan input field setelah item ditambahkan
        inputField.value = '';
    } else {
        alert('Please enter a valid item!');
    }
});

// Tangkap elemen tombol dan paragraf
const button = document.getElementById("changeColor");
const paragraph = document.getElementById("text");

// Tambahkan event listener untuk tombol
button.addEventListener("click", () => {
    // Ubah warna teks paragraf menjadi biru
    paragraph.style.color = "blue";
});

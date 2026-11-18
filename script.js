// Langkah 1 : Ambil elemen HTML yang akan di pakai
// ==========================================================================

const bagianForm = document.getElementById("bagianForm");
const formBooking = document.getElementById("formBooking");
const bagianInvoice = document.getElementById("bagianInvoice");
const pesanError = document.getElementById("pesanError");

// Ambil inputan dari form
const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumlah = document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");

// Data paket wisata
const dataPaket = {
  "Bali Escape" : { durasi : "3 Hari 2 Malam", malam: 2, harga: 2450000},
  "Bromo Sunrise Trip" : { durasi : "2 Hari 1 Malam", malam: 1, harga: 1350000},
  "Raja Ampat" : { durasi : "4 Hari 3 Malam", malam: 3, harga: 5750000},
  "Labuan Bajo Explorer" : { durasi : "3 Hari 2 Malam", malam: 2, harga: 3950000},
}


// Langkah 2 : formatting
// =========================================================
// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


// Langkah 3 : perintah saat form di submit
// ======================================================

formBooking.addEventListener("submit" , function(event){
  // Cegah halaman reload (kebiasaan bawaan form adalah reload)
  event.preventDefault();

  // mengambil isi setiap form
  const nama = inputNama.value;
  const paket = inputPaket.value;
  const jumlah = Number(inputJumlah.value);
  const berangkat = inputBerangkat.value;

  // Validasi form
  // semua pesan error dikumpulkan di dalam array ini
  const daftarError = [];

  // mengubah string "2026-11-18" menjadi objek Date JavaScript.
  // dengan begitu, kita bisa melakukan operasi tanggal
  const tglBerangkat = new Date(berangkat);

  // Tanggal hari ini (jamnya dibuang, sisakan tanggal saja)
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  // 1. Nama : tidak boleh kosong, min 3 karakter
  // =======================================================
  if (nama === ""){
    daftarError.push("Nama pemesan wajib diisi !")
  } else if (nama.length < 3){
    daftarError.push("Nama pemesan minimal 3 karakter !")
  }
  // push : digunakan untuk menambahkan data ke dalam array

  // 2. Paket : paket tidak boleh kosong
  // =========================================================
  if (paket === "") {
    daftarError.push("Mohon memilih pilihan paket !")
  }

  // 3. Jumlah orang tidak boleh kosong
  // =========================================================
  // jumlah orang < 1 ; jumlah orang minimal 1
  // jumlah orang > 20 ; jumlah  orang maksimal 20
  if (inputJumlah === "") {
    daftarError.push("Mohon di isi berapa jumlah orang yang ikut")
  } else if (jumlah < 1) {
    daftarError.push("jumlah minimal 1 orang")
  } else if (jumlah > 20) {
    daftarError.push("Jumlah maksimal 20 orang")
  }

  // 4. Tanggal berangkat: tidak boleh kosong,
  // Tannggal berangkat tidak boleh sebelum hari ini
  if (berangkat === "") {
    daftarError.push("Tanggal berangkat wajib di isi")
  } else if (tglBerangkat < hariIni) {
    daftarError.push("Tanggal berangkat tidak boleh hari ini")
  }

  // Error di tampilkan
  if (daftarError.length > 0){
    pesanError.innerHTML = daftarError.join("<br>");
    pesanError.classList.remove("d-none");
    return; // berhenti disini, dan invoice tidak ditampilkan
  }

  // 
  // innerHTML : Membaca atau 

  // ambil data paket yg di pilih, lalu hitung
  const detail = dataPaket[paket];

  // Total = harga per orang * jumlah orang
  const total = detail.harga * jumlah;

  // Tampilkan data ke invoice
  document.getElementById("outNama").textContent = nama;
  document.getElementById("outPaket").textContent = paket;
  document.getElementById("outBerangkat").textContent = berangkat;
  formatTanggal(berangkat);

  document.getElementById("outDurasi").textContent = detail.durasi;

  // Sembunyikan bagian form, dan tampilkan bagian Invoice
  bagianForm.classList.add("d-none");
  bagianInvoice.classList.remove("d-none");
});
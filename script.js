/**
 * PORTOFOLIO PARTISI - SCRIPT.JS
 * Script Interaktif untuk Halaman Web Portofolio & Catatan Kaderisasi PARTISI
 * Tema Warna: Pink Pastel & Kuning Pastel
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemePicker();
  initTimelineTabs();
  initPortfolioFilter();
  initScrollSpy();
  console.log('%c✨ Selamat Datang di Portofolio PARTISI ✨', 'background: #FFB3C6; color: #37282C; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 8px;');
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}

function initThemePicker() {
  const root = document.documentElement;
  const picker = document.getElementById('themePicker');
  const toggle = document.getElementById('themePickerToggle');
  const options = document.querySelectorAll('.theme-option');

  if (!picker || !toggle) return;

  let savedTheme = 'pink-yellow';
  try {
    savedTheme = localStorage.getItem('partisi-theme') || savedTheme;
  } catch (error) {
    console.warn('Tema tidak dapat dimuat dari penyimpanan browser.', error);
  }
  if (!['pink-yellow', 'blue-purple'].includes(savedTheme)) {
    savedTheme = 'pink-yellow';
  }

  const applyTheme = (theme, save = true) => {
    root.setAttribute('data-theme', theme);
    options.forEach(option => {
      const isActive = option.dataset.theme === theme;
      option.classList.toggle('active', isActive);
      option.setAttribute('aria-checked', String(isActive));
    });
    if (save) {
      try {
        localStorage.setItem('partisi-theme', theme);
      } catch (error) {
        console.warn('Tema tidak dapat disimpan di browser.', error);
      }
    }
  };

  applyTheme(savedTheme, false);

  toggle.addEventListener('click', () => {
    const isOpen = picker.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.theme);
      picker.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      showToast(`Tema ${option.dataset.theme === 'blue-purple' ? 'Biru & Ungu' : 'Pink & Kuning'} aktif`);
    });
  });

  document.addEventListener('click', event => {
    if (!picker.contains(event.target)) {
      picker.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. SCROLL SPY (ACTIVE NAVBAR LINK)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. TIMELINE TAB SWITCHER (EXPERIENCE & EDUCATION)
   -------------------------------------------------------------------------- */
function initTimelineTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetId) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. PORTFOLIO FILTER
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter projects with smooth animation
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. PROJECT MODAL DATA & HANDLERS
   -------------------------------------------------------------------------- */
const projectData = {
  project1: {
    title: "PARTISI Hub - Portal Arsip & Informasi Kegiatan Mahasiswa",
    category: "Web Development & Frontend",
    categoryClass: "tag-pink",
    overview: "PARTISI Hub adalah platform portal berbasis web yang dikembangkan khusus untuk memfasilitasi kebutuhan peserta dan panitia kaderisasi mahasiswa Sistem Informasi. Sistem ini menyediakan manajemen arsip modul materi, jadwal kegiatan berkala, fitur pengumpulan tugas mandiri, serta pengumuman berita kampus secara real-time.",
    challenge: "Banyak mahasiswa baru yang kesulitan melacak pengumuman dan materi kaderisasi jika hanya mengandalkan grup chat instan. Diperlukan portal satu pintu yang ringan, mudah diakses melalui ponsel pintar, serta memiliki navigasi yang intuitif.",
    solution: "Membangun antarmuka web responsif dengan struktur informasi rapi, mengoptimalkan kecepatan muat halaman, dan menerapkan penyimpanan lokal (LocalStorage) untuk bookmark materi belajar.",
    techStack: ["HTML5 Semantik", "CSS3 Flexbox & Grid", "JavaScript Modern (ES6+)", "LocalStorage API", "Font Awesome Icons"],
    date: "Semester Genap 2026",
    role: "Lead Frontend Developer & UI Designer"
  },
  project2: {
    title: "FoodieBites - Mobile App Redesign & Prototype",
    category: "UI/UX Case Study",
    categoryClass: "tag-yellow",
    overview: "Sebuah studi kasus perancangan antarmuka dan pengalaman pengguna (UI/UX) untuk aplikasi pemesanan kuliner di sekitar kampus. Fokus utama adalah menyederhanakan alur pemesanan makanan cepat saji saat jam istirahat kuliah.",
    challenge: "Pengguna sering mengeluhkan proses checkout yang berbelit-belit dan lambatnya visualisasi menu kantin saat jam sibuk.",
    solution: "Merancang wireframe, user flow baru, dan interactive prototype di Figma yang memangkas waktu pemesanan hingga 40% berdasarkan uji usability testing pada 15 mahasiswa.",
    techStack: ["Figma Design", "FigJam", "Design System", "Interactive Prototyping", "Usability Testing"],
    date: "2025",
    role: "UI/UX Researcher & Product Designer"
  },
  project3: {
    title: "FinSmart - Dashboard Manajemen Finansial Pribadi",
    category: "Web & Financial Analytics",
    categoryClass: "tag-pink",
    overview: "Aplikasi pencatat keuangan interaktif yang dirancang khusus untuk membantu mahasiswa dalam mengatur uang saku, memantau pengeluaran harian, serta menetapkan target tabungan bulanan.",
    challenge: "Mahasiswa sering kali kesulitan mencatat arus kas karena antarmuka aplikasi perbankan yang terlalu rumit dan kaku.",
    solution: "Menyediakan antarmuka dashboard yang bersih dan bersahabat dengan visualisasi grafik interaktif, kalkulator budget otomatis, dan kategori anggaran pintar.",
    techStack: ["JavaScript ES6+", "Chart.js", "Modern CSS", "Web Storage API"],
    date: "2025",
    role: "Full Frontend Author"
  },
  project4: {
    title: "Visual Identity & Creative Campaign Workshop Deck",
    category: "Creative Branding & Editorial",
    categoryClass: "tag-yellow",
    overview: "Koleksi materi branding kreatif, template presentasi editorial bergaya zine modern, serta paket media kit untuk workshop kepemimpinan dan portofolio digital mahasiswa.",
    challenge: "Membuat materi promosi dan slide deck workshop yang menonjol di tengah kebisingan media sosial dan menarik perhatian generasi muda.",
    solution: "Memadukan palet warna pink pastel dan kuning mentega dengan gaya visual scrapbook, tipografi serif klasik yang elegan, serta stiker ilustratif yang menyenangkan.",
    techStack: ["Adobe Photoshop", "Canva Pro", "Editorial Layout", "Typography Mastery"],
    date: "2026",
    role: "Creative Director & Graphic Designer"
  }
};

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const container = document.getElementById('projectModalContent');

  container.innerHTML = `
    <span class="modal-header-tag ${data.categoryClass}">${data.category}</span>
    <h3 class="modal-title">${data.title}</h3>

    <div class="modal-meta-box">
      <div class="meta-item">
        <span class="meta-lbl">Peran:</span>
        <span class="meta-txt">${data.role}</span>
      </div>
      <div class="meta-item">
        <span class="meta-lbl">Waktu Pengerjaan:</span>
        <span class="meta-txt">${data.date}</span>
      </div>
    </div>

    <div class="modal-body-content">
      <h4 style="font-size: 1.05rem; margin-bottom: 8px; color: var(--text-primary);"><i class="fa-solid fa-circle-info" style="color: var(--pink-500);"></i> Deskripsi Proyek</h4>
      <p>${data.overview}</p>

      <h4 style="font-size: 1.05rem; margin-bottom: 8px; color: var(--text-primary); margin-top: 18px;"><i class="fa-solid fa-bullseye" style="color: var(--yellow-500);"></i> Masalah & Solusi</h4>
      <p><strong>Tantangan:</strong> ${data.challenge}</p>
      <p><strong>Solusi:</strong> ${data.solution}</p>

      <h4 style="font-size: 1.05rem; margin-bottom: 10px; color: var(--text-primary); margin-top: 18px;"><i class="fa-solid fa-screwdriver-wrench" style="color: var(--pink-500);"></i> Teknologi yang Digunakan</h4>
      <div class="project-tech-stack" style="margin-bottom: 24px;">
        ${data.techStack.map(t => `<span>${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-sm btn-pink" onclick="showToast('Demo tautan proyek sedang diakses!'); closeProjectModal();">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Kunjungi Live Demo
        </button>
        <button class="btn btn-sm btn-outline" onclick="showToast('Repositori kode tersimpan di GitHub!'); closeProjectModal();">
          <i class="fa-brands fa-github"></i> Lihat Source Code
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
  if (event && event.target.closest('.modal-card') && !event.target.classList.contains('modal-close-btn')) {
    return;
  }
  const modal = document.getElementById('projectModal');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

/* --------------------------------------------------------------------------
   6. PARTISI NOTE MODAL DATA & HANDLERS
   -------------------------------------------------------------------------- */
const partisiNotesData = {
  1: {
    modul: "Materi PARTISI 1",
    title: "Mengenal Organisasi HMSI FMIPA Universitas Tanjungpura",
    badgeClass: "tag-pink",
    pemateri: "Bang Nabil Nur Fauzan",
    content: `
      <p>Himpunan Mahasiswa Sistem Informasi (HMSI) FMIPA Universitas Tanjungpura merupakan organisasi kemahasiswaan yang menjadi wadah bagi mahasiswa Program Studi Sistem Informasi untuk mengembangkan potensi, kreativitas, serta kemampuan berorganisasi. HMSI didirikan pada tanggal 23 Juli 2016 dan secara resmi diresmikan pada tanggal 22 September 2016.</p>

      <p>Keberadaan HMSI memiliki peran penting dalam mendukung kehidupan mahasiswa, tidak hanya dalam bidang akademik, tetapi juga dalam kegiatan non-akademik. Melalui organisasi ini, mahasiswa dapat mengembangkan kemampuan bekerja sama, berkomunikasi, menyampaikan pendapat, serta belajar menjadi pribadi yang memiliki rasa tanggung jawab dan jiwa kepemimpinan.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-star" style="color: var(--pink-500);"></i> Visi dan Misi HMSI</h4>
      <ul style="padding-left: 20px; list-style: disc; margin-bottom: 16px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">
        <li><strong>Visi:</strong> Mewujudkan mahasiswa Sistem Informasi yang kreatif, inovatif, dan adaptif dalam membangun potensi akademik maupun non-akademik.</li>
        <li><strong>Misi:</strong> Menyediakan wadah bagi mahasiswa Sistem Informasi dalam menyalurkan minat dan bakat melalui berbagai kegiatan serta program kerja organisasi.</li>
      </ul>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-sitemap" style="color: var(--yellow-500);"></i> Struktur Organisasi HMSI</h4>
      <ol style="padding-left: 20px; list-style: decimal; margin-bottom: 16px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">
        <li><strong>Badan Pengawas:</strong> Mengawasi dan mengevaluasi jalannya organisasi agar tetap sesuai dengan aturan serta tujuan yang telah ditetapkan.</li>
        <li><strong>Ketua Umum:</strong> Memimpin organisasi, mengoordinasikan setiap bagian, serta mengambil keputusan yang berkaitan dengan keberlangsungan organisasi.</li>
        <li><strong>Sekretaris:</strong> Mengelola administrasi, surat-menyurat, hasil rapat, serta dokumen penting organisasi.</li>
        <li><strong>Bendahara Umum:</strong> Mengelola keuangan, mencatat pemasukan dan pengeluaran, serta memastikan penggunaan dana dilakukan secara transparan dan bertanggung jawab.</li>
        <li><strong>Staff Divisi:</strong> Membantu menjalankan program kerja sesuai dengan bidang dan tugas masing-masing divisi.</li>
        <li><strong>Dewan Pembimbing:</strong> Memberikan arahan, masukan, serta bimbingan agar kegiatan dan pengelolaan organisasi dapat berjalan dengan baik.</li>
      </ol>

      <p>Melalui keberadaan HMSI, mahasiswa Sistem Informasi diharapkan tidak hanya memperoleh pengetahuan di dalam perkuliahan, tetapi juga pengalaman berorganisasi yang dapat menjadi bekal untuk kehidupan profesional di masa depan.</p>
    `
  },
  2: {
    modul: "Partisi 1 &bull; Materi 2",
    title: "Esensi Pengkaderan Mahasiswa Sistem Informasi",
    badgeClass: "tag-yellow",
    pemateri: "Bang Syukri Ma'ram",
    content: `
      <p>Pengkaderan atau kaderisasi merupakan salah satu proses penting dalam kehidupan organisasi kemahasiswaan. Dalam lingkungan Program Studi Sistem Informasi, kaderisasi menjadi proses pembinaan yang bertujuan membentuk mahasiswa agar memiliki pemahaman, sikap, serta tanggung jawab sebagai bagian dari lingkungan akademik dan organisasi.</p>

      <p>Kaderisasi bukan sekadar kegiatan pengenalan organisasi, tetapi juga sarana untuk membangun karakter, meningkatkan kemampuan diri, serta menanamkan nilai-nilai yang perlu dijaga oleh setiap mahasiswa. Melalui proses ini, mahasiswa diharapkan dapat mengenal lingkungan kampus dan organisasi lebih dalam sekaligus mempersiapkan diri untuk berkontribusi secara aktif.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-bullseye" style="color: var(--yellow-500);"></i> Mengapa Kaderisasi Diperlukan?</h4>
      <ol style="padding-left: 20px; list-style: decimal; margin-bottom: 16px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">
        <li><strong>Pengarahan dan Orientasi:</strong> Membantu mahasiswa mengenal lingkungan perkuliahan, organisasi, aturan, dan nilai yang berlaku.</li>
        <li><strong>Wadah untuk Tumbuh dan Berkembang:</strong> Mengembangkan kemampuan berkomunikasi, bekerja sama, berpikir kritis, berorganisasi, percaya diri, dan kepemimpinan.</li>
        <li><strong>Menjaga Nilai-Nilai yang Telah Dibangun:</strong> Meneruskan nilai, budaya, dan tujuan organisasi kepada generasi mahasiswa berikutnya.</li>
        <li><strong>Kedudukan dan Landasan Legalitas:</strong> Berdasarkan pedoman FMIPA Universitas Tanjungpura, buku pedoman HMSI, dan gerbang PARTISI.</li>
        <li><strong>Persyaratan Akademik:</strong> Kaderisasi dapat menjadi salah satu syarat untuk mendaftar seminar proposal.</li>
      </ol>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-route" style="color: var(--pink-500);"></i> Alur Kaderisasi PARTISI</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; font-size: 0.85rem;">
        <div style="background: #FFE3EC; padding: 10px; border-radius: 6px;"><strong>Orientasi:</strong> Mengenalkan lingkungan Sistem Informasi, HMSI, tujuan, dan nilai kaderisasi.</div>
        <div style="background: #FFF3B0; padding: 10px; border-radius: 6px;"><strong>Pembinaan:</strong> Mengembangkan pengetahuan, sikap, dan kemampuan melalui materi serta kegiatan.</div>
        <div style="background: #FFF0F3; padding: 10px; border-radius: 6px;"><strong>Evaluasi:</strong> Menilai pemahaman dan perkembangan peserta serta hal yang perlu dikembangkan.</div>
        <div style="background: #FDF9F8; padding: 10px; border-radius: 6px;"><strong>Pengukuhan:</strong> Mengesahkan penyelesaian rangkaian kaderisasi sesuai ketentuan.</div>
      </div>

      <p>Melalui proses kaderisasi, mahasiswa diharapkan mampu membangun karakter yang disiplin, bertanggung jawab, serta memiliki rasa kebersamaan. Kaderisasi PARTISI merupakan proses pembelajaran dan pengembangan diri yang memberikan bekal bagi kehidupan perkuliahan.</p>
    `
  },
  3: {
    modul: "Partisi 1 &bull; Materi 3",
    title: "Budaya Kampus, Etika, dan Tanggung Jawab Akademik dalam Sistem Informasi",
    badgeClass: "tag-pink",
    pemateri: "Ibu Devi Gusmita, S.,Kom., M.Kom.",
    content: `
      <p>Budaya kampus merupakan aspek penting dalam membentuk karakter mahasiswa selama menjalani kehidupan perkuliahan. Budaya kampus mencakup kegiatan belajar, etika, sopan santun, kedisiplinan, serta tanggung jawab dalam lingkungan akademik.</p>

      <p>Sebagai mahasiswa Sistem Informasi, penerapan budaya kampus perlu diperhatikan karena bidang ini tidak hanya mempelajari teknologi, tetapi juga melibatkan manusia sebagai pengguna dan pengelola sistem. Kemampuan akademik dan keterampilan teknologi harus diimbangi dengan sikap baik serta rasa tanggung jawab.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-circle-info" style="color: var(--pink-500);"></i> Apa itu Sistem Informasi?</h4>
      <p>Sistem Informasi merupakan perpaduan antara manusia, data, teknologi, dan prosedur yang saling berhubungan untuk mengumpulkan, mengolah, menyimpan, serta menyebarkan informasi. Informasi yang dihasilkan dapat digunakan untuk membantu proses pengambilan keputusan dalam organisasi maupun perusahaan.</p>

      <p>Sistem Informasi tidak hanya berfokus pada penggunaan komputer atau pembuatan aplikasi. Ada keterlibatan manusia, proses bisnis, dan pengelolaan data yang saling mendukung agar sistem berjalan secara efektif dan memberikan manfaat bagi penggunanya.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-shield-halved" style="color: var(--yellow-500);"></i> Prinsip Etika dalam Profesi Sistem Informasi</h4>
      <ul style="padding-left: 20px; list-style: disc; margin-bottom: 16px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">
        <li><strong>Menghindari Tindakan yang Merugikan:</strong> Teknologi yang dikembangkan harus memberikan manfaat dan tidak menimbulkan kerugian bagi pengguna.</li>
        <li><strong>Jujur dan Dapat Dipercaya:</strong> Data yang digunakan maupun dihasilkan harus sesuai dengan keadaan sebenarnya dan tidak dimanipulasi.</li>
        <li><strong>Menghormati Privasi:</strong> Penggunaan data pengguna harus dilakukan dengan izin dan tujuan yang jelas.</li>
        <li><strong>Menjaga Kerahasiaan:</strong> Informasi rahasia tidak boleh disebarluaskan kepada pihak yang tidak memiliki wewenang.</li>
      </ul>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-user-graduate" style="color: var(--pink-500);"></i> Penerapan Etika dalam Kehidupan Mahasiswa</h4>
      <p>Mahasiswa perlu mengerjakan tugas secara jujur tanpa melakukan plagiarisme, tidak menyebarkan informasi pribadi milik orang lain, menghargai pendapat teman saat berdiskusi, serta menggunakan teknologi secara bijak dan bertanggung jawab.</p>

      <p>Dengan memahami dan menerapkan etika sejak dini, mahasiswa dapat membangun kebiasaan positif yang berguna dalam dunia kerja. Profesional yang baik dinilai tidak hanya dari kemampuan teknis, tetapi juga dari integritas, tanggung jawab, dan cara menggunakan teknologi untuk memberikan manfaat bagi orang lain.</p>
    `
  },
  4: {
    modul: "Materi PARTISI 2 &bull; Materi 1",
    title: "Public Speaking dan Teknik Komunikasi yang Efektif",
    badgeClass: "tag-yellow",
    pemateri: "Bang Irwansyah",
    content: `
      <p>Public speaking merupakan kemampuan menyampaikan informasi, gagasan, maupun pendapat kepada orang lain secara lisan di hadapan audiens. Kemampuan ini penting bagi mahasiswa dalam perkuliahan dan organisasi, seperti menyampaikan pendapat, melakukan presentasi, menjadi moderator, hingga berbicara di hadapan banyak orang.</p>

      <p>Public speaking perlu dilatih agar pesan dapat disampaikan dengan jelas, terstruktur, dan mudah dipahami. Selain itu, pembicara perlu memperhatikan pelafalan, penggunaan mikrofon, intonasi suara, serta gestur tubuh.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-microphone-lines" style="color: var(--yellow-500);"></i> Teknik Dasar Public Speaking</h4>
      <ol style="padding-left: 20px; list-style: decimal; margin-bottom: 16px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">
        <li><strong>Pelafalan Huruf dan Kata:</strong> Mengucapkan huruf, kata, dan kalimat dengan jelas dan tepat agar informasi mudah dipahami.</li>
        <li><strong>Teknik Memegang Mikrofon:</strong> Memegang mikrofon pada posisi dan jarak yang sesuai agar suara terdengar jelas tanpa menutup bagian kepala mikrofon.</li>
        <li><strong>Intonasi Suara:</strong> Mengatur tinggi rendahnya nada suara agar penyampaian tidak monoton dan bagian penting mudah diperhatikan.</li>
        <li><strong>Gestur Tubuh:</strong> Menggunakan gerakan tangan, posisi tubuh, ekspresi wajah, dan kontak mata untuk mendukung penyampaian pesan serta membangun rasa percaya diri.</li>
      </ol>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-comments" style="color: var(--pink-500);"></i> Pentingnya Public Speaking bagi Mahasiswa</h4>
      <p>Kemampuan public speaking membantu mahasiswa menyampaikan pendapat, mengemukakan ide, dan berkomunikasi dengan lebih percaya diri. Kemampuan ini juga melatih penyusunan informasi secara terstruktur sehingga mudah dipahami oleh pendengar.</p>

      <p>Dalam lingkungan organisasi, public speaking mendukung koordinasi, penyampaian informasi, dan pelaksanaan berbagai kegiatan. Oleh karena itu, kemampuan berbicara di depan umum perlu terus dilatih agar mahasiswa dapat berkomunikasi secara efektif dalam berbagai situasi.</p>
    `
  },
  5: {
    modul: "Materi PARTISI 2 &bull; Materi 2",
    title: "Pengembangan Diri, Pengenalan Potensi, dan Kesehatan Mental",
    badgeClass: "tag-pink",
    pemateri: "Ibu Fitri",
    content: `
      <p>Pengembangan diri merupakan proses mengenali, memahami, serta meningkatkan kemampuan dan potensi yang dimiliki setiap individu. Dalam kehidupan mahasiswa, pengembangan diri menjadi hal penting karena masa perkuliahan merupakan tahap untuk membentuk karakter, meningkatkan kemampuan, serta mempersiapkan diri menghadapi berbagai tantangan.</p>

      <p>Selain kemampuan akademik, mahasiswa perlu memahami kondisi dirinya sendiri, termasuk kelebihan, kekurangan, ketakutan, serta hal-hal yang dapat memengaruhi perkembangan pribadi. Dengan mengenali diri sendiri, seseorang dapat mengetahui hal yang perlu dipertahankan maupun diperbaiki.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-compass" style="color: var(--pink-500);"></i> Mengenali Diri Melalui Refleksi Diri</h4>
      <p>Salah satu kegiatan dalam materi ini adalah pengisian kompas diri sebagai bentuk refleksi untuk membantu peserta mengenali kondisi psikologis, hambatan, serta potensi yang dimiliki.</p>

      <p>Refleksi diri membantu peserta memahami ketakutan terbesar, rasa tidak percaya diri, cara menghadapi permasalahan, serta langkah yang dapat dilakukan untuk mengatasi hambatan. Dengan memahami kondisi diri, seseorang dapat menentukan langkah pengembangan yang sesuai dengan kebutuhan dan kemampuannya.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-brain" style="color: var(--yellow-500);"></i> Mengenali Kondisi Psikologis</h4>
      <p>Setiap individu memiliki pengalaman, ketakutan, dan tantangan yang berbeda-beda. Karena itu, seseorang perlu memahami kondisinya sendiri tanpa selalu membandingkan kemampuan atau pencapaiannya dengan orang lain.</p>

      <p>Rasa takut dan tidak percaya diri dapat dialami siapa saja, tetapi tidak boleh menjadi alasan untuk berhenti mencoba. Dengan memahami sumber permasalahan dan mencari cara mengatasinya, seseorang dapat belajar menghadapi tantangan dengan lebih baik.</p>

      <h4 style="margin: 16px 0 8px; font-size: 1rem;"><i class="fa-solid fa-user-graduate" style="color: var(--pink-500);"></i> Pengembangan Diri bagi Mahasiswa</h4>
      <p>Pengembangan diri mencakup perkembangan mental, emosional, dan sosial, bukan hanya peningkatan kemampuan akademik. Mahasiswa menghadapi lingkungan pertemanan baru, tuntutan perkuliahan, kegiatan organisasi, serta tanggung jawab yang semakin besar.</p>

      <p>Melalui pengenalan diri, mahasiswa diharapkan mampu memahami potensi dan kekurangan, mengelola rasa tidak percaya diri, serta menentukan langkah tepat untuk menghadapi berbagai tantangan. Refleksi diri menjadi dasar untuk membangun kepercayaan diri, mengembangkan potensi, dan menjalani kehidupan perkuliahan dengan lebih terarah.</p>
    `
  }
};

function openNoteModal(noteId) {
  const data = partisiNotesData[noteId];
  if (!data) return;

  const modal = document.getElementById('noteModal');
  const container = document.getElementById('noteModalContent');

  container.innerHTML = `
    <span class="modal-header-tag ${data.badgeClass}">${data.modul}</span>
    <h3 class="modal-title">${data.title}</h3>
    ${data.pemateri ? `<p class="modal-speaker" style="margin: 8px 0 16px;"><strong><i class="fa-solid fa-user-tie" style="color: var(--pink-500);"></i> Pemateri:</strong> ${data.pemateri}</p>` : ''}
    <div class="modal-body-content">
      ${data.content}
      <div style="margin-top: 24px; text-align: right;">
        <button class="btn btn-sm btn-pink" onclick="closeNoteModal()">Tutup Catatan</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNoteModal(event) {
  if (event && event.target.closest('.modal-card') && !event.target.classList.contains('modal-close-btn')) {
    return;
  }
  const modal = document.getElementById('noteModal');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

/* --------------------------------------------------------------------------
   7. COPY TO CLIPBOARD HELPER
   -------------------------------------------------------------------------- */
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnElement) {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #27C93F;"></i>';
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
      }, 2000);
    }
    showToast(`Email ${text} berhasil disalin ke papan klip!`);
  }).catch(err => {
    showToast(`Tersalin: ${text}`);
  });
}

/* --------------------------------------------------------------------------
   8. FORM VALIDATION & SUBMISSION
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const messageInput = document.getElementById('senderMessage');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  let isValid = true;

  // Name Validation
  if (!nameInput.value.trim()) {
    nameInput.classList.add('is-invalid');
    nameError.classList.add('visible');
    isValid = false;
  } else {
    nameInput.classList.remove('is-invalid');
    nameError.classList.remove('visible');
  }

  // Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
    emailInput.classList.add('is-invalid');
    emailError.classList.add('visible');
    isValid = false;
  } else {
    emailInput.classList.remove('is-invalid');
    emailError.classList.remove('visible');
  }

  // Message Validation
  if (!messageInput.value.trim()) {
    messageInput.classList.add('is-invalid');
    messageError.classList.add('visible');
    isValid = false;
  } else {
    messageInput.classList.remove('is-invalid');
    messageError.classList.remove('visible');
  }

  if (!isValid) return;

  // Simulate Sending
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirimkan Pesan...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    showToast(`Terima kasih ${nameInput.value}! Pesan Anda telah berhasil terkirim ✨`);
    document.getElementById('contactForm').reset();
  }, 1200);
}

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. KEYBOARD ACCESSIBILITY (ESCAPE TO CLOSE MODAL)
   -------------------------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeNoteModal();
  }
});

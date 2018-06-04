var lapor = [
  {
    img:'images/profil1.jpg',
    name: 'Sarah Sunarto',
    time: '2 days ago',
    title: 'Permintaan Perbaikan Jalan',
    progress: '5',
    content: 'Pemerintah Kota Jogja, Jalanan di daerah Malioboro.banyak sekali jalan yang rusak parah dan sangat tidak aman digunakan oleh pengguna jalan '
  },
  {
    img:'images/Angel.jpg',
    name: 'Angel',
    time: '7 minutes ago',
    title: 'Masalah Parkir di Jogja',
    progress: '10',
    content: ' Pemerintah Kota Jogja.Kepada Dinas Perbuhungan Kota Jogja agar memperhatikan kembali masalah parkir di Jogja. Parkir di Jogja sudah mulai bisa dibilang amburadul, karena sudah banyak yang mulai makan jalan alias parkir tidak pada tempatnya dan dibiarkan saja seperti contoh di sepanjang jalan mulai dari setelah hotel sampai ke depan Toko-Toko, dan juga disepanjang jalan depan Bank Mandiri .Kiranya untuk segera ditindak lanjuti karena apakah harus menunggu sampai terjadi kemacetan total baru bertindak?. '
  },
  {
    img:'images/Ani.jpg',
    name: 'Ani',
    time: '2 hour ago',
    title: 'Penyalahgunaan Fasilitas Umum',
    progress: '15',
    content: 'Kementerian Pekerjaan Umum dan Perumahan Rakyat,Saya mau melaporkan penyalahgunaan infrastruktur jembatan di daerah kedaung, tangerang.Jembatan kedaung yang belum lama ini dibuka, sekarang malah ditutup oleh warga sekitar dengan menggunakan beton pembatas sehingga hanya ada celah sempit untuk lewat 1 motor jadi menyebabkan kemacetan parah..Terkadang warga sekitar juga melakukan pungli.Seakan2 jembatan tersebut mereka yg membangun.Dan jembatan tersebut malah dijadikan sebagai .tempat parkir dan jualan oleh warga sekitar.Banyak sekali kios2 diatas jembatan dan mobil2 parkir di jalan akses naik jembatan.'
  },
  {
    img:'images/Himawan.jpg',
    name: 'Himawan',
    time: '2 day ago',
    title: 'Situs yang diblokir pemerintah masih bisa dibuka',
    progress: '0',
    content: 'Kementerian Komunikasi dan Informatika.Situs-situs yang telah diblokir oleh pemerintah (pornografi, radikalisme dan sebagainya) ternyata masih bisa diakses dengan menggunakan browser Opera Mini. '
  },
  {
    img:'images/Joosang.jpg',
    name: 'Joosang',
    time: '3 day ago',
    title: 'Kemacetan yang terjadi di beberapa perempatan di kota Jogja',
    progress: '80',
    content: 'Jalan di bebrapa perampatan di kota jogja sudah banyak terjadi kemacetan di beberapa tempat seperti di daerah perempatan Monjali, perempatan daerah Malioboro, dan perempatan di daerah Ringroad.'

  },
  {
    img:'images/Lee.jpg',
    name: 'Lee Jarwo',
    time: '23 hour ago',
    title: 'Lambatnya proses klaim pencairan BPJS',
    progress: '77',
    content: 'Manajemen Rumah Sakit Gede Pratama mengeluhkan lambatnya proses pencairan klaim Badan Penyelenggara Jaminan Sosial (BPJS) Kesehatan.'

  },
  {
    img:'images/Rina.png',
    name: 'Rina',
    time: '7 hour ago',
    title: 'E-KTP Yang Belum di Jadi',
    progress: '50',
    content: 'Saya mau melaporkan, kenapa E-KTP saya belum jadi padahal saya mengajukan E-KTP dari bulan Desember sedangkan temen saya mamang saya mengajukan nya bulan Januari sudah jadi Mohon ditindaklanjuti, terima kasih.'

  },
  {
    img:'images/Sukjin.jpg',
    name: 'Sukjin',
    time: '6 day ago',
    title: 'Laporan penipuan web',
    progress: '85',
    content: 'Saya ingin melaporkan situs web yang saya curigai sebagai situs penipuan : http://www.penipuan.cf Mohon ditindaklanjuti, terima kasih.'
  }
]



var post = new Vue({
  el:'#home',
  data: {
    laporan: lapor,
    search: ''
  },
  computed: {
    searchLaporan: function searchLaporan() {
      var _this = this;

      return this.laporan.filter(function (e) {
        return e.title.toLowerCase().match(_this.search.toLowerCase()) || e.content.toLowerCase().match(_this.search.toLowerCase());
      });
    }
  }
});


Vue.component('todo-form', {
  template: '<form class="tulis-comment" @submit.prevent="todoEvent"> <input type="text" v-model="newTodo" placeholder="Tulis komentar disini...">' +
            '<input type="submit" value="POST" onclick="scrollWin()"></form>',
  data: function () {
    return {
      newTodo: ''
    }
  },
  methods: {
    todoEvent: function () {
      this.$emit('todo-created', this.newTodo);
      this.newTodo = '';
    }
  }
});
Vue.component('todo-list', {
  template: '<ul><li class="comment" v-for="todo in todos"><div class="cell1"><div class="photo"> <img src="images/profil.jpg" alt="profil picture"></div></div><div class="isi-comment"><h1>Sifa Kalila</h1><p>{{todo}}</p><p>a few seconds ago</p></div></li></ul>',
  props: ['todos']
});
new Vue({
  el: '#app',
  data: {
    'todos': []
  },
  methods: {
    addTodo: function (todo) {
      this.todos.push(todo);
    }
  }
});

var prevScrollpos = window.pageYOffset;
var x = prevScrollpos + 5;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos < 50) {
    document.getElementById("search").style.top = "0";
  } else if (prevScrollpos > currentScrollPos) {
    document.getElementById("search").style.top = "0";
  } else {
    document.getElementById("search").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;

}


// Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}

function transitionComm() {
  document.getElementById('content2').style.transform = "scale(1)";
};

function transitionPost() {
  document.getElementById("laporan").style.transform = "scale(1)";
};

var formLogin = document.getElementById('form-login');
var formSignUp = document.getElementById('form-signUp');

function signUp() {
  formLogin.style.display = "none";
  formSignUp.style.display = "block"
}

function signIn() {
  formLogin.style.display = "block";
  formSignUp.style.display = "none"
}

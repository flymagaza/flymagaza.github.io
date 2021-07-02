var active_page="Home";
var config_="1";

async function start()
{
  $(function(){
    $.ajax({
      type:'GET',
      url:'../config.js',
      success: function(cnf){         
        if (config_==="1") 
        {
          config_=config; 
          Login();        
        }
      }
    })
  });
}

start();

var database="";
var rootref="";
const modalpst=document.getElementById('pst');

async function Login(){
  await start();
  firebase.initializeApp(config_);
  database=firebase.database();
  rootref=database.ref();
  rootref.child('showcase').orderByKey().on('value',(data) =>{ //orderByKey().on All Data orderByKey().limitToFirst(2).on
    data.forEach(function(snapshot){
        var newPost = snapshot.val();  
        
        const tr=`
        <div class="client row" id="${newPost.id}" onClick="Get_Detail(this.id)">
          <div class="col-lg col md-12 client-img">
            <img src="${newPost.lct}" alt="${newPost.id}" class="img-fluid">
          </div>
        </div>
        `;
        modalpst.insertAdjacentHTML('beforeend',tr);
    });

    $('.site-main .showcase-area .owl-carousel').owlCarousel({
      items:4,
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
  
      responsive:{
          0:{items:1},
          544:{items:2},
          992:{items:3},
          1170:{items:4}
      }
  });

  $('.site-main .site-banner .owl-carousel').owlCarousel({
    items:1,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true
});
  });
};

  const ModalMain=document.querySelector('.site-main');  
  const addModal=document.querySelector('.add-modal');
  const modalWrapper=document.querySelector('.modal-wrapper');
  const ModalBody=document.querySelector('.modal-body');
  const ModalForm=document.querySelector('.modal-body .form-BG');
  const sizespos=document.querySelector('.sizes');
  const infopos=document.querySelector('.infos');

  function Get_Detail(clicked_id)
  {      
      modalWrapper.classList.remove('modal-hide');     
      ModalMain.classList.add('main-hide');

      let tr1="";
      rootref.child('products').orderByKey().equalTo(clicked_id).on('value',(data) =>{ //orderByKey().on All Data orderByKey().limitToFirst(2).on
        data.forEach(function(snapshot){
            var newPost = snapshot.val();  
            ModalForm.selection_img.src=newPost.lct;

            tr1="";
            infopos.innerHTML="";
            tr1=`
            <div class="model" id="brand"><p>${newPost.brand}</p></div>
            <br>
            <br>
            <p class="model">${newPost.info}</p> 
            <p class="model">${newPost.Bdn}</p> 
            <div id="callstore" class="model">Numara bilgisi ve siparişleriniz için lütfen iletişime geçin</div> 
            <div class="whatsapp">WHATSAPP 0554 713 10 53</div>             
            `;
            infopos.insertAdjacentHTML('beforeend',tr1);           

          });
        });
  }

  $(function() {
    Refresh();
});

function Refresh()
{        
    modalWrapper.classList.add('modal-hide');
}

  //Click Outside
document.querySelector('body').addEventListener('click', e => {
  if(e.target===ModalBody)
  {
      modalWrapper.classList.add('modal-hide');
      ModalMain.classList.remove('main-hide'); 
  }
  
});


document.addEventListener("DOMContentLoaded", startup);
function startup() {
  var el = document.getElementById("free");
  el.addEventListener("touchstart", handleStart, false);
}

function handleStart(evt) {
  evt.preventDefault();
  modalWrapper.classList.add('modal-hide');
  ModalMain.classList.remove('main-hide');  

  }

document.addEventListener('touchstart', e => {
  if(e.target===ModalBody)
  {
      modalWrapper.classList.add('modal-hide');
      ModalMain.classList.remove('main-hide');   
  }
});

const map_=document.getElementById('FLY_map').style;
const info_=document.getElementById('FLY_info');
function FLYMAP(){
  info_.style.display='none';
  map_.display='block';
}

function FLYINFO(){
  map_.display='none';
  info_.style.display='block';
}

function FLYFacebook(){
  setTimeout(Facebook_, 1000);
}
    function Facebook_(){
      window.open('https://www.facebook.com/profile.php?id=100054446621197', '_blank');  
      FLYINFO();
      document.getElementById("input_1").checked=true;
    }

function FLYInstagram() {  
  setTimeout(Instagram_, 1000);  
}
    function Instagram_(){
      window.open('https://www.instagram.com/flyayakkabiizmir/', '_blank');  
      FLYINFO();
      document.getElementById("input_1").checked=true;
    }

function FLYWhatsapp() {  
  setTimeout(Whatsapp_, 1000);  
}
    function Whatsapp_(){
      window.open('https://api.whatsapp.com/send?phone=905547131053', '_blank');  
      FLYINFO();
      document.getElementById("input_1").checked=true;
    }
    
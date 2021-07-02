
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

const gridpos=document.getElementById('pst_grid');
var  flt=document.getElementById("active_page").innerHTML;

async function Login(){
  await start();
  firebase.initializeApp(config_);
  database=firebase.database();
  rootref=database.ref();
  rootref.child('products').orderByChild('category').equalTo(flt).on('value',(data) =>{ //orderByKey().on All Data orderByKey().limitToFirst(2).on
    data.forEach(function(snapshot){
        var newPost = snapshot.val();  
        
        //<p class="price">${newPost.price}</p>
        const tr=`
        <div class="col-lg-3 col-md-6 col-sm-12 element-item ${newPost.izo}">
          <div class="our-project">
              <div class="img" id="${newPost.id}" onClick="Get_Detail(this.id)">              
                <img src="${newPost.lct}" alt="${newPost.id}">
                <h4 class="title-h4">${newPost.brand}</h4>
              </div>
          </div>
        </div>
        `;

        //<span class="price">${newPost.price}</span>
        //<span class="old_price">${newPost.old_price} TL</span>
        const trizo=`
        <div class="col-lg-3 col-md-6 col-sm-12 element-item ${newPost.izo}">
          <div class="our-project">
              <div class="img" id="${newPost.id}" onClick="Get_Detail(this.id)">
                <img src="${newPost.lct}" alt="${newPost.id}">
                <h4 class="title-h4">${newPost.brand}</h4>
              </div>
          </div>
        </div>
        `;

        
        if ((newPost.izo==="outlet") & (newPost.old_price!=""))
        {
        gridpos.insertAdjacentHTML('beforeend',trizo);
        }
        else gridpos.insertAdjacentHTML('beforeend',tr);
    });
  });
}

  const ModalMain=document.querySelector('.site-main');  
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

            //<div class="price">${newPost.price} TL</div>
            tr1="";
            infopos.innerHTML="";
            tr1=`
            <div class="model">${newPost.brand}</div>            
            <div class="model">${newPost.info}</div> 
            <div class="model">${newPost.Bdn}</div> 
            <div class="model">Numara bilgisi ve siparişleriniz için lütfen iletişime geçin</div> 
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

function handleStart(evt) {
  modalWrapper.classList.add('modal-hide');
  ModalMain.classList.remove('main-hide');  
  evt.preventDefault();
  }

document.addEventListener('touchstart', e => {
  if(e.target===ModalBody)
  {
      modalWrapper.classList.add('modal-hide');
      ModalMain.classList.remove('main-hide');   
  }
});
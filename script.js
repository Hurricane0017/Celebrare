setTimeout(preloader,1500);
function preloader(){
    let ele=document.querySelector('.preloader').style;
    ele.opacity='0';
    ele.zIndex='-10';
}
let pic=document.querySelector('#image');
let file=document.querySelector('#pic');
let main=document.querySelector('.main');
let pre=document.querySelector('.preview');
let prePic=document.querySelector('#image-preview');
file.addEventListener('change',handleFile);
let files;
let cirRotAng=0;
let flipAng=0;

let cropper="";
function handleFile(e){
    console.log(e);
    if(this.files[0].type.substr(0,5)=="image"){
        files=this.files;
        main.style.opacity="0";
        pre.style.opacity="1";
        pre.style.zIndex="10";
        prePic.src=URL.createObjectURL(this.files[0]);
        prePic.style.transform=`rotateZ(${cirRotAng}deg) rotateY(${flipAng}deg)`;
        document.querySelector('.warn').innerHTML="";
    }
    else{
        document.querySelector('.warn').innerHTML="Select valid Image!"
    }
}

let back=document.querySelector('.fa-circle-left');
let rotate=document.querySelector('.fa-rotate-right');
let flip=document.querySelector('.fa-right-left');
let send=document.querySelector('.fa-paper-plane');
let crop=document.querySelector('.fa-crop');

back.addEventListener('click',handleBack);
rotate.addEventListener('click',handleRotate);
flip.addEventListener('click',handleFlip);
send.addEventListener('click',handleSend);
crop.addEventListener('click',handleCrop);

pre.addEventListener('keypress',handleSend);


function handleBack(){
    file.value="";
    prePic.src="";
    main.style.opacity="1";
    pre.style.zIndex="-10";
    pre.style.opacity="0";
    cirRotAng=0;
    flipAng=0;
}

function handleRotate(){
    cirRotAng+=90;
    prePic.style.transform=`rotateZ(${cirRotAng}deg) rotateY(${flipAng}deg)`;
}

function handleFlip(){
    flipAng+=180;
    prePic.style.transform=`rotateY(${flipAng}deg) rotateZ(${cirRotAng}deg)`;
}

function handleSend(e){
    pic.style.transform=`rotateY(${flipAng}deg) rotateZ(${cirRotAng}deg)`;
    if(cropper==""){
        pic.src=URL.createObjectURL(files[0]);
    }
    else{
        pic.src=cropper.getCroppedCanvas().toDataURL("image/png");
    }
    main.style.opacity="1";
    pre.style.zIndex="-10";
    pre.style.opacity="0";
    pic.style.opacity="1";
    cirRotAng=0;
    flipAng=0;
    file.value="";
    prePic.src='';
}

function handleCrop(){
    prePic.style.transform=`rotateZ(${cirRotAng}deg) rotateY(${flipAng}deg)`;
    cropper=new Cropper(prePic,{
        aspectRatio:0,
        viewMode:0,
    });

}

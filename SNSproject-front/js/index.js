const loginBtn = document.querySelector('.login-btn')
const closeBtn = document.querySelector('.closebtn')
const form = document.querySelector('.form')
const Logininputs = form.querySelectorAll('input')
const registerBtn = document.querySelector('.register')
const blurbox = document.querySelector('.box')
const registerCon = document.querySelector('.register-container')
const registerInputs = registerCon.querySelectorAll('input')
const subBtn = document.querySelector('.submit-btn')
const birth = document.querySelector('.birth')
const yearOfBirth = document.getElementById('year')
const monthOfBirth = document.getElementById('month')
const dayOfBirth = document.getElementById('day')


//계정 생성하기 버튼 클릭시(로그인화면에서)
registerBtn.addEventListener('click', function(){
  registerCon.classList.remove('close')
  blurbox.classList.remove('close')
})

//계정 생성창 닫기
closeBtn.addEventListener('click', function(){
  registerCon.classList.add('close')
  blurbox.classList.add('close')
})

// 계정생성창 label꾸미기
registerCon.addEventListener('keyup',function(e){
  if(e.target.value !== ''){
    e.target.previousElementSibling.classList.remove('forcusing')
  }else{
    e.target.previousElementSibling.classList.add('forcusing')
  }
})

//계정 생성-서버연결
subBtn.addEventListener('click', function(e){
  e.preventDefault()
  checkUserInfo() 
})

let id = document.getElementById('userId')
// let name = document.getElementById('username')
let email = document.getElementById('useremail')
let password = document.getElementById('userPw')
let repassword = document.getElementById('userPw2')
//사용자 정보 검사 - 회원가입용
function checkUserInfo(e){
  fetch(`http://127.0.0.1:5103/api/users/`,{
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(datas => {
          console.log(datas)
          datas.user.forEach(data => {
            if(email.value == data.email){
              alert('이미 등록된 Email 입니다.')
            }else{
              checking(id,'아이디를 입력해주세요.')
              // checking(name,'이름을 입력해주세요.')
              checking(email,'이메일을 입력해주세요.')
              checking(password,'비밀번호를 입력해주세요.')
              checking(repassword,'비밀번호를 다시 입력해주세요.')
              if(password.value !== repassword.value){
                alert('비밀번호가 일치하지 않습니다.')
              }else if(
                yearOfBirth.value === '' || yearOfBirth.value === null || yearOfBirth.value === undefined ||
                monthOfBirth.value === '' || monthOfBirth.value === null || monthOfBirth.value === undefined||
                dayOfBirth.value === '' || dayOfBirth.value === null || dayOfBirth.value === undefined)
                {
                alert('생년월일을 골라주세요')
              }else if(checkEmail(email.value) === false){
                alert('이메일 형식이 올바르지 않습니다.')
              }else if(password.value.length < 4){
                alert('비밀번호를 4자리 이상 입력해주세요')
              }else{ 
                fetch('http://127.0.0.1:5103/api/users/register',{
                  method: 'POST', 
                  headers: {'Content-Type':'application/json'},
                  body: JSON.stringify({
                    userId: id.value,
                    // name: name.value,
                    email: email.value,
                    birth: `${yearOfBirth.options[yearOfBirth.selectedIndex].value}년 ${monthOfBirth.options[monthOfBirth.selectedIndex].value}월 ${dayOfBirth.options[dayOfBirth.selectedIndex].value}일`,
                    password: password.value,
                    repassword: repassword.value,
                  })
                })
                  .then(response => response.json())
                  .then(data => {
                    if(data.code == 401){
                      alert(`code:${data.code}, ${data.message}`)
                    }else if(data.code == 200){
                      alert(`code:${data.code}, ${data.message}`)
                    }
                  })
                  .catch(e => console.log(e))
            
            
                  registerCon.classList.add('close')
                  blurbox.classList.add('close')
              }

            }

          });
        })
        .catch(e => console.log(e))
}


//로그인 
loginBtn.addEventListener('click', function(e){
  checkLoginUserInfo()
  e.preventDefault()
})

function checkLoginUserInfo(){
  const loginUserEmail = document.getElementById('loginuseremail')
  const loginUserPw = document.getElementById('loginuserPw')

  checking(loginUserEmail,'이메일을 입력해주세요')
  checking(loginUserPw,'비밀번호를 입력해주세요')
  console.log(loginUserEmail.value)
  if(loginUserEmail.value !== '' && loginUserPw.value !== ''){
    fetch('http://127.0.0.1:5103/api/users/login',{
      method: 'POST', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email: loginUserEmail.value,
        password: loginUserPw.value,
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data.code == 401){
          alert(`code:${data.code}, ${data.message}`)
        }else if(data.code == 200){
          console.log(data)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('email', data.email)
          localStorage.setItem('token', data.token)
          localStorage.setItem('author', data._id)
          localStorage.setItem('imgUrl', data.imgUrl)
          alert(`code:${data.code}, ${data.message}`)
          window.location.href = "./SNSproject-front/html/main.html"
        }
      })
      .catch(e => console.log(e))
  }
}

//회원가입 빈칸 검사
function checking(name,content){
  if(name.value === '' || name.value === null || name.value === undefined){
    alert(`${content}`)
  }
}

//이메일 유효성검사
function checkEmail(value){
  let pattern = /^[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-z]{2,3}$/i;
  if(!pattern.test(value)){
    return false
  }else{
    return true
  }
}
window.addEventListener('load',function(){
  console.log(window.localStorage.getItem('author'))
})
// Simple admin login + 2FA demo
const loginForm = document.getElementById('loginForm');
const twoFa = document.getElementById('twoFa');
const adminArea = document.getElementById('adminArea');
const sendCodeBtn = document.getElementById('sendCode');
const sendStatus = document.getElementById('sendStatus');
const demoCodeEl = document.getElementById('demoCode');
const showCodeDemo = document.getElementById('showCodeDemo');

let currentCode = null;

loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();
  // Very small demo credential check (replace with server-side checks in production)
  if(user === 'admin' && pass === 'password'){
    loginForm.classList.add('hidden');
    twoFa.classList.remove('hidden');
  } else {
    alert('Invalid username or password (demo: admin / password)');
  }
});

// show/hide password toggle
const togglePass = document.getElementById('togglePass');
const adminPass = document.getElementById('adminPass');
togglePass.addEventListener('click', function(){
  if(adminPass.type === 'password'){
    adminPass.type = 'text';
    togglePass.textContent = 'Hide';
  } else {
    adminPass.type = 'password';
    togglePass.textContent = 'Show';
  }
});

function generateCode(){
  return Math.floor(100000 + Math.random()*900000).toString();
}

sendCodeBtn.addEventListener('click', function(){
  const email = document.getElementById('adminEmail').value.trim();
  if(!email) return alert('Please enter an email to send the verification code.');
  currentCode = generateCode();
  sendStatus.textContent = 'Sending code...';

  // Attempt to send using EmailJS if configured (user should replace with their own keys)
  if(window.emailjs){
    emailjs.send('service_xxx','template_xxx',{to_email: email, code: currentCode})
      .then(()=>{
        sendStatus.textContent = 'Verification code sent to ' + email + '.';
      }).catch((err)=>{
        sendStatus.textContent = 'Unable to send email (EmailJS not configured). Showing demo code below.';
        demoCodeEl.textContent = currentCode;
        showCodeDemo.classList.remove('hidden');
      });
  } else {
    // Fallback demo: show the code on-screen (not secure, for local/testing only)
    sendStatus.textContent = 'Email service not configured - demo mode: code displayed below.';
    demoCodeEl.textContent = currentCode;
    showCodeDemo.classList.remove('hidden');
  }
});

document.getElementById('verifyBtn').addEventListener('click', function(){
  const val = document.getElementById('verifyCode').value.trim();
  if(!val) return alert('Enter the verification code');
  if(val === currentCode){
    twoFa.classList.add('hidden');
    adminArea.classList.remove('hidden');
  } else {
    alert('Invalid verification code');
  }
});

document.getElementById('logoutBtn').addEventListener('click', function(){
  adminArea.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

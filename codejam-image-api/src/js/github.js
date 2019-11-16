const anchorTag = document.getElementById('login')
const outputText = document.getElementById('output')
anchorTag.addEventListener('click', (e) => {
  e.preventDefault()
  const authenticator = new netlify.default ({})
  authenticator.authenticate({provider:"github", scope: "user"}, (err, data) => {
    err ? outputText.innerText = "Error Authenticating with GitHub: " + err :
    outputText.innerText = "Authenticated with GitHub. Access Token: " + data.token;
  })
})

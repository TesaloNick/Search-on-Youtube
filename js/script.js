const form = document.querySelector('.form')
const searchVideoResult = document.querySelector('.search-video-result')
const optionsAPI = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ce84889158msh60600aa7ca1713ap1d994bjsn762debf01314',
    'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
  }
};

async function searchVideo(text) {
  const youtubeKey = 'AIzaSyDLX3jqUlal-e8dAJUEKuE58E4p5sW-90c'
  const langpair = 'ru|en'

  let translator = await fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?q=${text}&langpair=${langpair}&de=a%40b.c&onlyprivate=0&mt=1`, optionsAPI)
    .then(response => response.json())
    .then(response => response.responseData.translatedText)
    .catch(err => console.error(err));

  await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${youtubeKey}&q=${translator}&type=video`)
    .then(response => response.json())
    .then(response => createIframe(response.items[0].id.videoId))
    .catch(err => console.error(err));
}

function createIframe(youtubeID) {
  searchVideoResult.innerHTML = ''
  const iframe = document.createElement('iframe')
  iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeID}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen`)
  iframe.setAttribute('frameborder', `0`)
  iframe.setAttribute('allow', `autoplay; encrypted-media`)
  iframe.setAttribute('allowfullscreen', 'allowfullscreen')
  searchVideoResult.append(iframe)
  iframe.setAttribute('height', iframe.offsetWidth * 9 / 16)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let findingText = document.querySelector('.form__input').value
  searchVideo(findingText)
})


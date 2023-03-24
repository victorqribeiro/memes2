const $ = (elm, parent) => (parent || document).querySelector(elm)
const $all = (elm, parent) => Array.from((parent || document).querySelectorAll(elm))
const parser = new DOMParser()

let lastTs = null

async function getContents(ts) {
  const result = await fetch('back.php' + (ts ? `?ts=${ts}` : ''))
  const data = await result.json()
  const doc = parser.parseFromString(data, 'text/html')
  showMemes($all('article', doc.body))
}

function showMemes(articles) {
  const main = $('#main')
  main.innerHTML = ''
  main.scrollIntoView()
  for (const article of articles) {
    const video = $('video', article)
    if (video) {
      video.controls = true
      video.muted = false
    }
    lastTs = $('header', article).dataset.ts
    $all('a', article).forEach(a => a.href = `https://memedroid.com${a.getAttribute('href')}`)      
    $all('.no-display, .tags-container, .video-play-button-container, .comment-dyn-link, .item-rating-icon, .item-controls-icon, .video-volume-button', article)
      .forEach(elm => elm.remove())
    main.appendChild(article)
  }
  lastTs && updateNextBtn()
}

function updateNextBtn() {
  const btn = $('#next')
  btn.onclick = function() {
    this.disabled = true
    getContents(lastTs)
  }
  btn.disabled = false
}

getContents()

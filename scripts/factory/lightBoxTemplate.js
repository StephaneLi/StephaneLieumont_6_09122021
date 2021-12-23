  export default class LightboxTemplate {
    constructor(media) {
      this._media = media
      this.$wrapperLightbox = null
      this.$lightboxContent = null
      this.$lightboxCloseButton = null
      this.$lightboxNextButton = null
      this.$lightboxPrevButton = null
    }

    get lightBoxHTMLElement () {
      return this.$wrapperLightbox 
    }
    get contentHTMLElement () {
      return this.$lightboxContent 
    }
    get closeButton () {
      return this.$lightboxCloseButton 
    }
    get nextButton () {
      return this.$lightboxNextButton 
    }
    get prevButton () {
      return this.$lightboxPrevButton 
    }

    createLightBox () {
      const template = document.createElement('aside')
      template.classList.add('lightbox')

      const content = `
        <button class="lightbox__close material-icons">close</button>
        <button class="lightbox__next material-icons">arrow_forward_ios</button>
        <button class="lightbox__prev material-icons">arrow_back_ios</button>
        <div class="lightbox__container">
          <div class="lightbox__container__content"></div>             
        </div>
      `

      template.innerHTML = content

      this.$lightboxContent = template.querySelector('.lightbox__container__content')
      this.$lightboxCloseButton = template.querySelector('.lightbox__close')
      this.$lightboxNextButton = template.querySelector('.lightbox__next')
      this.$lightboxPrevButton = template.querySelector('.lightbox__prev')

      this.$wrapperLightbox = template
      return template
    }

    loadFactory (media) {
      this._media = media
      // Definition du template de la lightbox
      if (this._media.type === 'picture') {
        this._loadImage()
      } else if (this._media.type === 'video') {
        this._loadVideo()
      } else {      
        throw `Le média avec un type : ${ this._media.type } est incompatible`
      }
    }

    _loadImage() {
      const image = new Image()
      image.src = this._media.path
      image.alt = this._media.description
      
      const loader = document.createElement('div')      
      loader.classList.add('lightbox__loader')

      this.$lightboxContent.innerHTML = ''
      this.$lightboxContent.appendChild(loader)
      
      image.onload = () => {
        this.$lightboxContent.removeChild(loader)

        const title = document.createElement('p')
        title.innerHTML = this._media.title
        
        this.$lightboxContent.appendChild(image)
        this.$lightboxContent.appendChild(title)
      }
    }

    _loadVideo() {
      const video = document.createElement('video');
      video.src = this._media.path;
      video.setAttribute('title', this._media.description)
      video.autoplay = true;

      const title = document.createElement('p')
      title.innerHTML = this._media.title

      this.$lightboxContent.innerHTML = ''
      this.$lightboxContent.appendChild(video)
      this.$lightboxContent.appendChild(title)
    }
  }
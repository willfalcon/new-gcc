const cloudinary = require('cloudinary-core');

module.exports = () => {

  function getVideoTag(videoName) {
    const cl = new cloudinary.Cloudinary({cloud_name: "good-citizen", secure: true});
    return cl.videoTag(videoName, {preload: 'auto', autoplay: 'true', loop: 'true'}).setAttr('id', 'homeVideo').toHtml();
  }

  function getWindow(el) {
    const styles = window.getComputedStyle(el);
    return {
      height: styles.height,
      width: styles.width
    } || new Error('Not a valid style prop!');
  }

  function sizeVideo(videoEl) {
    const styles = getWindow(document.querySelector('.main-container'));
    const headerStyles = getWindow(document.querySelector('.header'));
    const { height, width } = styles;
    console.log(parseInt(width) / parseInt(height));
    if (parseInt(width) / parseInt(height) < 16 / 9) {
      console.log('height greater than width');
      videoEl.style.height = `100%`;
      videoEl.style.width = 'auto';
    } else {
      console.log('width greater than height');
      videoEl.style.width = '100%';
      videoEl.style.height = 'auto';
    }
  }



  const videoTag = getVideoTag('GCC_Random_BG');

  const videoWrapper = document.getElementById('video');

  videoWrapper.innerHTML = videoTag;

  const videoEl = document.querySelector('#video video');
  sizeVideo(videoEl);

  window.addEventListener('resize', () => {
    sizeVideo(videoEl);
  });

}

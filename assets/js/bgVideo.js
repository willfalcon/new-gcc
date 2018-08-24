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
  const videoTag = getVideoTag('GCC_Random_BG');

  const videoWrapper = document.getElementById('video');

  const styles = getWindow(document.querySelector('body'));
  const headerStyles = getWindow(document.querySelector('.header'));
  console.log(styles.height);
  const { height, width } = styles;

  videoWrapper.innerHTML = videoTag;

  const videoEl = document.querySelector('#video video');

    if (height > width) {
      videoEl.style.height = `100%`;
      videoEl.style.width = 'auto';
    }
    console.log(parseInt(height) - parseInt(headerStyles.height));


}

const parseUrl = require("url-parse");

const validExtensionImage = (imageurl) => {
  const validExtension = ["jpg", "png", "gif"];
  const extension = imageurl.split(".").pop().toLowerCase();

  return validExtension.includes(extension);
};

const validExtensionFile = (file) => {
  const extension = file.split(".").pop().toLowerCase();
  return extension === "pdf" ? true : false;
};

const validResources = (url, origin) => {
  const validExtimg = ["jpg", "png", "gif"];

  const formOrigin = {
    videos: (url) => {
      const parsedUrl = parseUrl(url, true);
      const domain = parsedUrl.hostname;
      console.log(domain);
      // Es un video de YouTube
      if (
        domain.includes("youtube.com") ||
        domain.includes("youtu.be") ||
        domain.includes("youtube-nocookie.com")
      ) {
        return true;
      } else if (domain.includes("vimeo.com")) {
        // Es un video de Vimeo
        return true;
      } else {
        // No es una URL válida de un video
        return false;
      }
    },
    images: (url) => {
      const extract = url.split(".").pop().toLowerCase();
      return validExtimg.includes(extract);
    },
    slider: (url) => {
      const extract = url.split(".").pop().toLowerCase();
      return validExtimg.includes(extract);
    },
    logos: (url) => {
      const extract = url.split(".").pop().toLowerCase();
      return validExtimg.includes(extract);
    },
  };
  return formOrigin[origin](url);
};

module.exports = {
  validExtensionImage,
  validExtensionFile,
  validResources,
};

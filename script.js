(event) => {
  event.preventDefault();
  dropArea.classList.remove('dragging');

  Array.from(event.dataTransfer.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = document.createElement('img');
      imgElement.src = e.target.result;
      imagePreview.appendChild(imgElement);
    };
    reader.readAsDataURL(file);
  });
};

const geoLocationDisplay = document.getElementById('geoLocation');
const getLocation = document.getElementById('getLocation');

getLocation.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        geoLocationDisplay.textContent = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      },
      () => {
        geoLocationDisplay.textContent = 'Unable to retrieve location';
      }
    );
  } else {
    geoLocationDisplay.textContent = 'Geolocation is not supported';
  }
});

const activateCamera = document.getElementById('activateCamera');
const deactivateCamera = document.getElementById('deactivateCamera');
const videoFeed = document.getElementById('videoFeed');
let stream;

activateCamera.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoFeed.srcObject = stream;
    deactivateCamera.disabled = false;
  } catch (error) {
    console.error('Camera access error', error);
  }
});

deactivateCamera.addEventListener('click', () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    videoFeed.srcObject = null;
    deactivateCamera.disabled = true;
  }
});

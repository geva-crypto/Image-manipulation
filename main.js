<input type="text" id="fileIoUrl" placeholder="Paste file.io link here">
<button onclick="fetchImage()">Load & Invert Image</button>
<canvas id="canvas"></canvas>
<script>
async function fetchImage() {
  const url = document.getElementById('fileIoUrl').value;
  const response = await fetch(url);
  const blob = await response.blob();
  const img = new Image();
  img.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width; canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    // Inversion logic goes here (see previous example)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i]     = 255 - imageData.data[i];     // R
      imageData.data[i + 1] = 255 - imageData.data[i + 1]; // G
      imageData.data[i + 2] = 255 - imageData.data[i + 2]; // B
    }
    ctx.putImageData(imageData, 0, 0);
  };
  img.src = URL.createObjectURL(blob);
}
</script>


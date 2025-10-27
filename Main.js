<input type="file" id="imgInput">
<canvas id="canvas"></canvas>
<script>
document.getElementById('imgInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i]     = 255 - imageData.data[i];     // R
        imageData.data[i + 1] = 255 - imageData.data[i + 1]; // G
        imageData.data[i + 2] = 255 - imageData.data[i + 2]; // B
      }
      ctx.putImageData(imageData, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});
</script>

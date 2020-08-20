function loadPDF(url) {
  const x = landingPageEl.getElementById('pdf-frame');
  x.src = url;
  const y = landingPageEl.getElementById('pdf-blanket');
  y.style.display = 'block';
}

function closePDF() {
  const x = landingPageEl.getElementById('pdf-frame');
  x.src = '';
  const y = landingPageEl.getElementById('pdf-blanket');
  y.style.display = 'none';
}

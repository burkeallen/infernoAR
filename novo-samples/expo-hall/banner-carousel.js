let ntarBannerCards = landingPageEl.querySelectorAll('.ntar-banner-card');
let ntarBannerNodes = landingPageEl.querySelectorAll('.ntar-banner-node');
let ntarBannerCurrent = 0;
let ignoreClick = false;
let autoScrollTime = 15000;
let ntarBannerTimer = ntarStartAutoScroll(autoScrollTime);
console.log('Starting:', ntarBannerTimer);

function triggerClick() {
  clearInterval(ntarBannerTimer);
  ignoreClick = true;
  setTimeout(function () {
    ignoreClick = false;
  }, 600);
  ntarBannerTimer = ntarStartAutoScroll(autoScrollTime);
}

// 1 for forward, -1 for back
function ntarGoToBanner(direction) {
  let dirForward = false;
  let standby = 'right';
  let out = 'left';
  let nextBanner = null;
  // Do nothing if the carousel should not advance
  if (direction !== -1 && direction !== 1) return;
  // Direction Forward
  if (direction === 1) {
    dirForward = true;
    standby = 'left';
    out = 'right';
    if (ntarBannerCurrent === ntarBannerCards.length - 1) {
      nextBanner = 0;
    } else {
      nextBanner = ntarBannerCurrent + 1;
    }
  }
  // Direction Backward
  if (direction === -1) {
    if (ntarBannerCurrent === 0) {
      nextBanner = ntarBannerCards.length - 1;
    } else {
      nextBanner = ntarBannerCurrent - 1;
    }
  }

  // Preposition next banner
  ntarBannerCards[nextBanner].className =
    'ntar-banner-card ntar-banner-is-standby-' + standby;

  // Reset z-Indexes
  for (let x = 0; x < ntarBannerCards.length; x++) {
    if (x === nextBanner) {
      ntarBannerCards[x].style.zIndex = 8;
      continue;
    }
    if (x === ntarBannerCurrent) {
      ntarBannerCards[x].style.zIndex = 7;
      continue;
    }
    ntarBannerCards[x].style.zIndex = 6;
  }

  // Set new styles
  setTimeout(function () {
    ntarBannerCards[ntarBannerCurrent].className =
      'ntar-banner-card ntar-banner-is-out-' + out;
    ntarBannerCards[nextBanner].className = 'ntar-banner-card ntar-banner-is-active';
    ntarBannerNodes[ntarBannerCurrent].className = 'ntar-banner-node';
    ntarBannerNodes[nextBanner].className = 'ntar-banner-node ntar-is-active';
    ntarBannerCurrent = nextBanner;
  }, 150);
}

function ntarStartAutoScroll(autoScrollDelay = 10000) {
  return setInterval(function () {
    ntarGoToBanner(1);
    console.log('Timer: ', ntarBannerTimer);
  }, autoScrollDelay);
}

if (ntarBannerTimer) {
  console.log('Unloading:', ntarBannerTimer);
  clearInterval(ntarBannerTimer);
}

// Register Click Handlers
landingPageEl.querySelector('#ntar-aleft').addEventListener('click', function (e) {
  if (ignoreClick) return;
  triggerClick();
  ntarGoToBanner(-1);
});

landingPageEl.querySelector('#ntar-aright').addEventListener('click', function (e) {
  if (ignoreClick) return;
  triggerClick();
  ntarGoToBanner(1);
});

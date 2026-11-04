
// スクロールすると各セクションがふわっと表示される
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// ギャラリーのカテゴリ切り替え
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".cards .card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === "all" || category === filter;

      card.style.display = show ? "" : "none";
    });
  });
});



/* ギャラリー拡大機能は gallery-view.html に移動 */

// LUMINA スクロールフェードイン
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(
    "section:not(#home), .card, .about-grid, .collection-grid"
  );

  targets.forEach((element) => {
    element.classList.add("scroll-reveal");
  });

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    targets.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  targets.forEach((element) => observer.observe(element));
});



// LUMINA 流れ星演出
document.addEventListener("DOMContentLoaded", () => {

  function createShootingStar() {
    const star = document.createElement("div");
    star.className = "lumina-shooting-star";

    star.style.left = (Math.random() * 70) + "vw";
    star.style.top = (5 + Math.random() * 55) + "vh";

    document.body.appendChild(star);

    requestAnimationFrame(() => {
      star.classList.add("fly");
    });

    setTimeout(() => star.remove(), 1800);
  }

  setTimeout(() => {
    createShootingStar();

    setInterval(() => {
      createShootingStar();
    }, 5000);
  }, 1000);

});

// LUMINA 幻想的な光のオーブ
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".lumina-floating-orbs")) {
    const orbs = document.createElement("div");
    orbs.className = "lumina-floating-orbs";
    document.body.prepend(orbs);
  }
});


// LUMINA MUSIC TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("lumina-background-music");
  const button = document.getElementById("lumina-music-toggle");

  if (!music || !button) return;

  const updateButton = () => {
    const playing = !music.paused;
    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-label", playing ? "音楽を停止" : "音楽を再生");
    button.setAttribute("title", playing ? "音楽を停止" : "音楽を再生");
    button.querySelector(".music-icon").textContent = playing ? "♫" : "♪";
  };

  // ページを開いたら自動再生を試す
  music.volume = 1.0;
  music.play().then(updateButton).catch(() => {
    // ブラウザが自動再生を制限した場合はボタン操作で再生
    updateButton();
  });

  button.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
      } catch (error) {
        console.log("音楽を再生できませんでした:", error);
      }
    } else {
      music.pause();
    }
    updateButton();
  });

  music.addEventListener("play", updateButton);
  music.addEventListener("pause", updateButton);
});

/* MUSIC BUTTON: hide on scroll */
window.addEventListener("scroll", () => {
  const button = document.getElementById("lumina-music-toggle");
  if (!button) return;

  button.classList.toggle("music-hidden", window.scrollY > 80);
}, { passive: true });


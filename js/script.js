
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
const galleryCards = document.querySelectorAll("#gallery .card");

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



/* ギャラリー拡大・スライド機能 */
const galleryImages = Array.from(
  document.querySelectorAll("#gallery .cards .card img")
);

// 画像の枚数を確認
console.log("ギャラリー画像の枚数:", galleryImages.length);

const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalCount = document.getElementById("modalCount");

let currentImage = 0;

function showGalleryImage(index) {
  if (galleryImages.length === 0) return;

  currentImage =
    (index + galleryImages.length) % galleryImages.length;

  modalImage.src = galleryImages[currentImage].src;
  modalImage.alt = galleryImages[currentImage].alt;
  modalCount.textContent =
    `${currentImage + 1} / ${galleryImages.length}`;

  modal.classList.add("open");
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    showGalleryImage(index);
  });
});


document.getElementById("modalClose").onclick = () => {
  modal.classList.remove("open");
};

document.getElementById("modalPrev").onclick = () => {
  showGalleryImage(currentImage - 1);
};

document.getElementById("modalNext").onclick = () => {
  showGalleryImage(currentImage + 1);
};

// 背景をクリックして閉じる
modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("open");
  }
});

// キーボード操作
document.addEventListener("keydown", event => {
  if (!modal.classList.contains("open")) return;

  if (event.key === "Escape") {
    modal.classList.remove("open");
  }

  if (event.key === "ArrowRight") {
    showGalleryImage(currentImage + 1);
  }

  
  if (event.key === "ArrowLeft") {
    showGalleryImage(currentImage - 1);
  }
});

// JavaScriptはここで終了

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

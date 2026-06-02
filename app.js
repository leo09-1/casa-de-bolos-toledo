import { products } from "./products_data.js";

const grid = document.getElementById("products-grid");
const buttons = document.querySelectorAll(".cat-btn");

function renderProducts(filter = "all") {

  grid.innerHTML = "";

  const list =
    filter === "all"
      ? products
      : products.filter(product => product.cat === filter);

  list.forEach((product, index) => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.style.animation =
      `fadeUp 0.7s ${index * 0.05}s both`;

    card.innerHTML = `
      <div class="product-img-wrap">
        <img
          class="product-img"
          src="${product.img}"
          alt="${product.name}"
          loading="lazy"
        />
      </div>

      <div class="product-body">

        <h3 class="product-title">
          ${product.name}
        </h3>

        <div class="product-price">
          ${product.price}
        </div>

        ${
          product.desc && product.desc.trim() !== ""
            ? `<p class="product-desc">${product.desc}</p>`
            : ""
        }

      </div>
    `;

    grid.appendChild(card);

  });

}

buttons.forEach(button => {

  button.addEventListener("click", () => {

    buttons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    renderProducts(button.dataset.cat);

  });

});

renderProducts();

const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);

document
  .querySelectorAll(".reveal")
  .forEach(element => observer.observe(element));

if (window.lucide) {
  lucide.createIcons();
}
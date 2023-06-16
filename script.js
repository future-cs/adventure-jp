"use strict";

console.log("water");

// Mobile navigation

const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");

btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

// Smooth Scrolling Animation

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (
      link.classList.contains("main-nav-link") ||
      link.classList.contains("nav-cta")
    )
      header.classList.toggle("nav-open");
  });
});

// Google Maps Link
const coordsLink = document.querySelector(".coordsLink");
coordsLink.addEventListener("click", function () {
  window.open(
    "https://www.google.com/maps/place/Jo%C3%A3o+Pessoa,+State+of+Para%C3%ADba,+Brazil/@-7.1464312,-34.9639993,12z/data=!3m1!4b1!4m6!3m5!1s0x7ace839019aa3d7:0x6e414a9c6d26db34!8m2!3d-7.1188352!4d-34.8814339!16zL20vMDFoeTlk?entry=ttu",
    "_blank"
  );
});

// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Set current year on footer

const footerYear = document.querySelector(".year");
const currentYear = new Date().getFullYear();
footerYear.textContent = currentYear;

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// Weather API

const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weatherDescription");
const humidity = document.querySelector(".humidity");

const apiKey = "a1efb7c24899dd3064ff76380fe419fe";
// const joaoPessoaID = "3397277";
const joaoPessoaID = "5391811";

const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q";

async function checkWeather() {
  const response = await fetch(
    apiURL + `&id=${joaoPessoaID}` + `&appid=${apiKey}`
  );
  const data = await response.json();

  // Content formating
  const weatherDescriptionFormated =
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1);

  const weatherInFahrenheit = function (temp) {
    return (temp * 9) / 5 + 32;
  };

  // Final Output
  temperature.textContent =
    Math.round(data.main.temp) +
    `˚C (${Math.round(weatherInFahrenheit(data.main.temp))}˚F)`;
  weatherDescription.textContent = weatherDescriptionFormated;
  humidity.textContent = data.main.humidity;
}
checkWeather();

// Luxon API - Joao Pessoa - Local Time

const localTimeOutput = document.querySelector(".localTime");
const joaoPessoaLocalTime = function () {
  const now = luxon.DateTime.now().setZone("Brazil/East");
  localTimeOutput.textContent = now.toFormat("HH:mm:ss");
};

setInterval(function () {
  joaoPessoaLocalTime();
}, 1000);

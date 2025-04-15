// index.html

document.addEventListener("DOMContentLoaded", function () {
  const mobileNavToggle = () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav ul");
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "☰";
    header.prepend(hamburger);

    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  };

  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    });
  };

  const highlightCurrentPage = () => {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav ul li a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("current-page");
      }
    });
  };

  const imageHoverEffects = () => {
    document.querySelectorAll(".highlight-box img").forEach((img) => {
      img.addEventListener("mouseenter", () => {
        img.parentElement.style.transform = "translateY(-10px)";
        img.parentElement.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
      });
      img.addEventListener("mouseleave", () => {
        img.parentElement.style.transform = "translateY(0)";
        img.parentElement.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      });
    });
  };

  const visitorCounter = () => {
    const counterElement = document.createElement("div");
    counterElement.className = "visitor-counter";
    counterElement.innerHTML =
      '<span>Visitors Today: </span><span id="count">0</span>';
    document.querySelector("footer").prepend(counterElement);

    let count = 0;
    const target = Math.floor(Math.random() * 200) + 50;
    const interval = setInterval(() => {
      if (count < target) {
        count++;
        document.getElementById("count").textContent = count;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  const init = () => {
    mobileNavToggle();
    smoothScroll();
    highlightCurrentPage();
    imageHoverEffects();
    visitorCounter();

    document.querySelector(
      "footer p"
    ).innerHTML = `Copyright © ${new Date().getFullYear()} Heritage Town Museum`;
  };

  init();
});

//   about.html

document.addEventListener("DOMContentLoaded", function () {
  const setupMobileNav = () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav ul");
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "☰";
    header.prepend(hamburger);

    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  };

  const setupTeamHover = () => {
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach((member) => {
      member.addEventListener("mouseenter", () => {
        member.style.transform = "translateY(-10px)";
        member.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
      });
      member.addEventListener("mouseleave", () => {
        member.style.transform = "translateY(0)";
        member.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      });
    });
  };

  const buildTimeline = () => {
    const timelineData = [
      { year: "1925", event: "Museum founded by local historians" },
      { year: "1942", event: "Temporary closure during WWII" },
      { year: "1960", event: "New wing added to the building" },
      { year: "1985", event: "Designated as a heritage site" },
      { year: "2000", event: "Digital archive project launched" },
      { year: "2015", event: "Major renovation completed" },
      { year: "2020", event: "Virtual tour system implemented" },
    ];

    const timelineContainer = document.getElementById("timeline");
    timelineData.forEach((item) => {
      const eventElement = document.createElement("div");
      eventElement.className = "event";
      eventElement.innerHTML = `
          <div class="event-year">${item.year}</div>
          <div class="event-description">${item.event}</div>
        `;
      timelineContainer.appendChild(eventElement);
    });
  };

  const updateFooterYear = () => {
    const footerYear = document.querySelector("footer p");
    footerYear.textContent = `Copyright © ${new Date().getFullYear()} Heritage Town Museum`;
  };

  const init = () => {
    setupMobileNav();
    setupTeamHover();
    buildTimeline();
    updateFooterYear();
  };

  init();
});

// exhibit

document.addEventListener("DOMContentLoaded", function () {
  const setupMobileNav = () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav ul");
    if (!header || !nav) return;

    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.setAttribute("aria-label", "Toggle navigation menu");
    hamburger.setAttribute("role", "button");
    hamburger.setAttribute("tabindex", "0");
    hamburger.innerHTML = "☰";
    header.prepend(hamburger);

    const toggleMenu = () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    };

    hamburger.addEventListener("click", toggleMenu);
    hamburger.addEventListener("keypress", (e) => {
      if (e.key === "Enter") toggleMenu();
    });

    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
          toggleMenu();
        }
      });
    });
  };

  const setupExhibitFilter = () => {
    const filterSelect = document.getElementById("category");
    const exhibitCards = document.querySelectorAll(".exhibit-card");
    if (!filterSelect || exhibitCards.length === 0) return;

    exhibitCards.forEach((card) => {
      // Use data-category already present in HTML or fallback
      card.dataset.category = card.dataset.category || "permanent";
    });

    filterSelect.addEventListener("change", () => {
      const selectedValue = filterSelect.value;

      exhibitCards.forEach((card) => {
        const shouldShow =
          selectedValue === "all" || card.dataset.category === selectedValue;

        if (shouldShow) {
          card.classList.remove("hide");
          requestAnimationFrame(() => {
            card.classList.add("show");
          });
        } else {
          card.classList.remove("show");
          setTimeout(() => {
            card.classList.add("hide");
          }, 300);
        }
      });
    });
  };

  const setupExhibitModals = () => {
    const exhibitCards = document.querySelectorAll(".exhibit-card");

    exhibitCards.forEach((card) => {
      const moreLink = card.querySelector("a");
      if (!moreLink) return;

      moreLink.addEventListener("click", (e) => {
        e.preventDefault();
        const title = card.querySelector("h3")?.textContent || "";
        const description = card.querySelector("p")?.textContent || "";
        const img = card.querySelector("img");
        const imgSrc = img?.src || "";
        const imgAlt = img?.alt || "";

        showExhibitModal(title, description, imgSrc, imgAlt);
      });
    });
  };

  const showExhibitModal = (title, description, imgSrc, imgAlt) => {
    let modal = document.getElementById("exhibit-modal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "exhibit-modal";
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal" role="button" aria-label="Close modal">&times;</span>
                    <img class="modal-exhibit-img" src="" alt="">
                    <h3 id="modal-exhibit-title"></h3>
                    <div class="modal-exhibit-description"></div>
                    <button class="modal-tour-btn">Virtual Tour</button>
                </div>
            `;
      document.body.appendChild(modal);

      const closeModal = () => {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
      };

      modal.querySelector(".close-modal").addEventListener("click", closeModal);
      modal.querySelector(".modal-tour-btn").addEventListener("click", () => {
        alert(`Starting virtual tour for: ${title}`);
      });
      window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    modal.querySelector("#modal-exhibit-title").textContent = title;
    modal.querySelector(".modal-exhibit-description").textContent = description;
    modal.querySelector(".modal-exhibit-img").src = imgSrc;
    modal.querySelector(".modal-exhibit-img").alt = imgAlt;

    modal.style.display = "block";
    document.body.classList.add("no-scroll");
  };

  const setupPagination = () => {
    const paginationLinks = document.querySelectorAll(".pagination a");
    paginationLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        paginationLinks.forEach((l) => l.classList.remove("active"));
        if (!isNaN(parseInt(link.textContent))) {
          link.classList.add("active");
        }
        console.log(`Loading page: ${link.textContent}`);
      });
    });
  };

  const setupFeaturedCollection = () => {
    const featuredBtn = document.querySelector(".featured-collection .btn");
    if (!featuredBtn) return;

    featuredBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const title =
        document.querySelector(".featured-collection h2")?.textContent || "";
      const description =
        document.querySelector(".featured-collection p")?.textContent || "";
      const img = document.querySelector(".featured-collection img");
      const imgSrc = img?.src || "";
      const imgAlt = img?.alt || "";
      showExhibitModal(title, description, imgSrc, imgAlt);
    });
  };

  const updateFooterYear = () => {
    const footerYear = document.querySelector("footer p");
    if (footerYear) {
      footerYear.textContent = `Copyright © ${new Date().getFullYear()} Heritage Town Museum`;
    }
  };

  const init = () => {
    setupMobileNav();
    setupExhibitFilter();
    setupExhibitModals();
    setupPagination();
    setupFeaturedCollection();
    updateFooterYear();
  };

  init();
});

//   events.html

document.addEventListener("DOMContentLoaded", function () {
  const setupMobileNav = () => {
    const header = document.querySelector("header");
    const nav = document.querySelector("nav ul");
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "☰";
    header.prepend(hamburger);

    const toggleMenu = () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    };

    hamburger.addEventListener("click", toggleMenu);

    // Close mobile menu when clicking on a link
    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
          toggleMenu();
        }
      });
    });
  };

  // ==================== EVENT FILTERING ====================
  const setupEventFilter = () => {
    const filterSelect = document.getElementById("event-category");
    const eventCards = document.querySelectorAll(".event-card");

    const categories = ["upcoming", "tours", "programs", "upcoming"];
    eventCards.forEach((card, index) => {
      card.dataset.category = categories[index] || "upcoming";
    });

    filterSelect.addEventListener("change", () => {
      const selectedValue = filterSelect.value;

      eventCards.forEach((card) => {
        const shouldShow =
          selectedValue === "all" || card.dataset.category === selectedValue;

        if (shouldShow) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  };

  const setupCalendar = () => {
    const calendarContainer = document.querySelector(".calendar-container");
    const calendarTitle = document.querySelector(".calendar-title");
    const prevBtn = document.querySelector(".calendar-prev");
    const nextBtn = document.querySelector(".calendar-next");
    const calendarGrid = document.querySelector(".calendar-grid");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const events = {
      "2025-4-20": "Spring Exhibition Opening",
      "2025-4-27": "Guided Historical Tour",
      "2025-5-10": "Artisan Workshop",
      "2025-5-18": "Lecture: Local History",
    };

    function renderCalendar() {
      calendarTitle.textContent = new Date(
        currentYear,
        currentMonth
      ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      calendarGrid.innerHTML = "";

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      dayNames.forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.className = "day-header";
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
      });

      // Get first day of month and total days
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const today = new Date();

      // Add empty cells for days before first day
      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.className = "calendar-day empty";
        calendarGrid.appendChild(emptyDay);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
        const dayElement = document.createElement("div");
        dayElement.className = "calendar-day";
        dayElement.textContent = day;

        // Check if today
        if (
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear()
        ) {
          dayElement.classList.add("today");
        }

        if (events[dateStr]) {
          dayElement.classList.add("has-event");
          dayElement.dataset.event = events[dateStr];
          dayElement.dataset.eventDate = `${day}/${
            currentMonth + 1
          }/${currentYear}`;
        }

        dayElement.addEventListener("click", handleCalendarDayClick);

        calendarGrid.appendChild(dayElement);
      }
    }

    function handleCalendarDayClick(e) {
      const dayElement = e.currentTarget;
      const eventTitle = dayElement.dataset.event;
      const eventDate = dayElement.dataset.eventDate;

      if (eventTitle) {
        document.querySelectorAll(".calendar-day.selected").forEach((el) => {
          el.classList.remove("selected");
        });

        dayElement.classList.add("selected");

        showEventModal(eventTitle, eventDate);
      }
    }

    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });

    renderCalendar();
  };

  // ==================== EVENT MODAL ====================
  const showEventModal = (eventTitle, eventDate) => {
    let modal = document.getElementById("event-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "event-modal";
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3 id="modal-event-title"></h3>
                    <p class="modal-event-date"></p>
                    <div class="modal-event-description">
                        <p>This is a detailed description of the event. In a real implementation, this would come from your event database or API.</p>
                        <p>Additional details about time, location, and registration requirements would be displayed here.</p>
                    </div>
                    <button class="modal-rsvp">RSVP Now</button>
                </div>
            `;
      document.body.appendChild(modal);

      modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
      });

      modal.querySelector(".modal-rsvp").addEventListener("click", () => {
        alert(
          `RSVP for: ${eventTitle}\n\nThis would open a registration form in a real implementation.`
        );
      });

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          document.body.classList.remove("no-scroll");
        }
      });
    }

    modal.querySelector("#modal-event-title").textContent = eventTitle;
    modal.querySelector(".modal-event-date").textContent = eventDate;

    modal.style.display = "block";
    document.body.classList.add("no-scroll");
  };

  const setupEventCards = () => {
    document.querySelectorAll(".event-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
        card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      });

      const moreInfo = card.querySelector("a");
      if (moreInfo) {
        moreInfo.addEventListener("click", (e) => {
          e.preventDefault();
          const title = card.querySelector("h3").textContent;
          const date = card.querySelector(".event-date").textContent;
          showEventModal(title, date);
        });
      }
    });
  };

  const updateFooterYear = () => {
    const footerYear = document.querySelector("footer p");
    footerYear.textContent = `Copyright © ${new Date().getFullYear()} Heritage Town Museum`;
  };

  const init = () => {
    setupMobileNav();
    setupEventFilter();
    setupCalendar();
    setupEventCards();
    updateFooterYear();
  };

  init();
});

// media html

function showImage(imgElement) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = imgElement.src;
  mainImage.alt = imgElement.alt;
}

// Media filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("media-category");
  const thumbnails = document.querySelectorAll(".thumbnail-grid img");

  // Add category tags via data attributes (dummy for example)
  const categories = ["exhibits", "events", "historical"];
  thumbnails.forEach((thumb, index) => {
    thumb.dataset.category = categories[index % categories.length];
  });

  filter.addEventListener("change", () => {
    const selected = filter.value;

    thumbnails.forEach((img) => {
      if (selected === "all" || img.dataset.category === selected) {
        img.style.display = "inline-block";
      } else {
        img.style.display = "none";
      }
    });
  });

  const tourBtn = document.querySelector(".start-tour-btn");
  const tourSection = document.querySelector(".virtual-tour");

  tourBtn?.addEventListener("click", () => {
    tourSection.scrollIntoView({ behavior: "smooth" });
  });
});

// contact.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");
  const errorContainer = document.getElementById("form-error-message");

  // Error handling function to display error messages
  const showError = (element, message) => {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
    element.parentNode.appendChild(errorElement);
  };

  const clearErrors = () => {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => error.remove());
  };

  form.name.addEventListener("keyup", function () {
    if (form.name.value.trim() === "") {
      showError(form.name, "Name is required.");
    } else {
      clearErrors();
    }
  });

  form.email.addEventListener("keyup", function () {
    if (form.email.value.trim() === "") {
      showError(form.email, "Email is required.");
    } else {
      clearErrors();
    }
  });

  form.subject.addEventListener("keyup", function () {
    if (form.subject.value.trim() === "") {
      showError(form.subject, "Subject is required.");
    } else {
      clearErrors();
    }
  });

  form.message.addEventListener("keyup", function () {
    if (form.message.value.trim() === "") {
      showError(form.message, "Message is required.");
    } else {
      clearErrors();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    // const subscribed = form.subscribe.checked;

    clearErrors();
    errorContainer.textContent = "";

    if (!name || !email || !subject || !message) {
      errorContainer.textContent = "Please fill in all required fields.";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError(form.email, "Please enter a valid email address.");
      return;
    }

    // let confirmation = `Thank you, ${name}!\n\nYour message has been received.\nSubject: ${subject}`;
    // if (subscribed) {
    //   confirmation += `\n\n✅ You are subscribed to our newsletter.`;
    // }

    // alert(confirmation);

    console.log({
      name,
      email,
      subject,
      message,
      // subscribed,
    });

    setTimeout(() => {
      form.reset();
    }, 1000);
  });

  const visitHeader = document.querySelector(".contact-details h2");
  const mapSection = document.querySelector(".map-section");

  visitHeader.addEventListener("click", () => {
    mapSection.scrollIntoView({ behavior: "smooth" });
  });
});

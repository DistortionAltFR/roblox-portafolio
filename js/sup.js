const VISIT_KEY = "visit_sent";

if (!localStorage.getItem(VISIT_KEY)) {
  localStorage.setItem(VISIT_KEY, "1");

  fetch("https://purple-rain-c7cb.sebastian19852006.workers.dev/", {
    method: "POST",
    keepalive: true
  }).catch(() => {});
}

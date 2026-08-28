export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Desktop Dream — Error</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1 id="error-title">This page didn't load</h1>
      <p id="error-body">Something went wrong. Try again or return to the desktop.</p>
      <div class="actions">
        <button id="retry" class="primary" onclick="location.reload()">Try again</button>
        <a id="home" class="secondary" href="/">Go home</a>
      </div>
    </div>
    <script>
      const translations = {
        en: ["This page did not load", "Something went wrong. Try again or return to the desktop.", "Try again", "Go home"],
        ru: ["Страница не загрузилась", "Произошла ошибка. Попробуйте снова или вернитесь на рабочий стол.", "Повторить", "На главную"],
        uk: ["Сторінка не завантажилася", "Сталася помилка. Спробуйте ще раз або поверніться на стільницю.", "Спробувати ще", "На головну"],
        de: ["Diese Seite wurde nicht geladen", "Ein Fehler ist aufgetreten. Erneut versuchen oder zum Desktop zurückkehren.", "Erneut versuchen", "Zur Startseite"],
        pl: ["Nie udało się wczytać strony", "Wystąpił błąd. Spróbuj ponownie lub wróć do pulpitu.", "Spróbuj ponownie", "Strona główna"],
        cs: ["Stránku se nepodařilo načíst", "Došlo k chybě. Zkuste to znovu nebo se vraťte na plochu.", "Zkusit znovu", "Domů"],
        hu: ["Az oldal nem töltődött be", "Hiba történt. Próbáld újra, vagy térj vissza az asztalra.", "Újra", "Kezdőlap"]
      };
      const locale = localStorage.getItem("desktop-dream-locale") || "en";
      const copy = translations[locale] || translations.en;
      document.documentElement.lang = locale;
      document.getElementById("error-title").textContent = copy[0];
      document.getElementById("error-body").textContent = copy[1];
      document.getElementById("retry").textContent = copy[2];
      document.getElementById("home").textContent = copy[3];
    </script>
  </body>
</html>`;
}

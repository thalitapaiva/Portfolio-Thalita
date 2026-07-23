export const THEME_STORAGE_KEY = "tp-theme";

/** Runs before paint to apply saved / system theme (avoids flash + broken dark). */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var r=document.documentElement;if(t==='dark')r.classList.add('dark');else r.classList.remove('dark');r.style.colorScheme=t;r.setAttribute('data-theme',t)}catch(e){}})();`;

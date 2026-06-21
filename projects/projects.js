// Edit this list to add, remove, or change your projects.
// "image" can be a local file (e.g. "images/myproject.jpg") or a full URL.
// "url" is where the card links when clicked.

const PROJECTS = [
  /*
  {
    name: "template",
    description: "short desc.",
    images: ["assets/image.jpg", ],
    url: "https://azrafe7.github.io/",
    repo: ""
  },
  */
  {
    name: "NetBookBug",
    description: "Multiplayer (LAN) scrabble-like board game written in C++. Defeat your enemies writing words with your available letters. Gain bonuses by using more letters and forming longer words making your enemies' life harder.",
    images: ["assets/NetBookBug_00.jpg", "assets/NetBookBug_01.jpg", ],
    url: "https://sourceforge.net/projects/netbookbug/",
    repo: ""
  },
  {
    name: "Spoke Chart",
    description: "Customizable spoke chart in plain JS.",
    images: ["assets/spoke_chart_00.jpg", "assets/spoke_chart_01.jpg", ],
    url: "https://azrafe7.github.io/spoke_chart/",
    repo: "https://github.com/azrafe7/azrafe7.github.io/tree/main/spoke_chart"
  },
  {
    name: "Worldle Web",
    description: "A multilanguage wordle clone built with Flutter (this one is a web prototype).",
    images: ["assets/worldle_web_00.jpg", "assets/worldle_web_01.jpg", ],
    url: "https://azrafe7.github.io/worldle_web/",
    repo: ""
  },
  {
    name: "JSON compare",
    description: "Compare JSON responses (with format and strict compare).",
    images: ["assets/compare_json_00.jpg", ],
    url: "https://azrafe7.github.io/cmp_response/",
    repo: "https://github.com/azrafe7/azrafe7.github.io/tree/main/cmp_response"
  },
  {
    name: "hxGeomAlgo",
    description: "Small collection of computational geometry algorithms in Haxe.",
    images: ["assets/hxGeomAlgo_00.jpg", "assets/hxGeomAlgo_01.jpg", "assets/hxGeomAlgo_02.jpg", ],
    url: "https://azrafe7.github.io/hxGeomAlgo/index.html",
    repo: "https://github.com/azrafe7/hxGeomAlgo"
  },
  {
    name: "hxDelaunay",
    description: "Delaunay triangulations, Voronoi, convex hull and more. Ported to Haxe 3 from https://github.com/sledorze/hxDelaunay (itself a port of the excellent https://github.com/nodename/as3delaunay).",
    images: ["assets/hxDelaunay_00.jpg", "assets/hxDelaunay_01.jpg", "assets/hxDelaunay_02.jpg", ],
    url: "https://htmlpreview.github.io/?https://raw.githubusercontent.com/azrafe7/hxDelaunay/refs/heads/master/bin/html5/bin/index.html",
    repo: "https://github.com/azrafe7/hxdelaunay"
  },
  {
    name: "hxClipper",
    description: "Port of Angus Johnson's Clipper lib v6.4.2 to haxe 3.1+",
    images: ["assets/hxClipper_00.jpg", ],
    url: "https://htmlpreview.github.io/?https://raw.githubusercontent.com/azrafe7/hxClipper/refs/heads/master/bin/js/index.html",
    repo: "https://github.com/azrafe7/hxClipper"
  },
  {
    name: "hxDaedalus",
    description: "Haxe cross target version of the as3 Daedalus-lib (https://code.google.com/p/daedalus-lib/) co-authored with Justin Mills (@nanjizal).",
    images: ["assets/hxDaedalus_00.jpg", ],
    url: "https://htmlpreview.github.io/?https://github.com/hxDaedalus/hxDaedalus-Examples/blob/master/hxDaedalus-Examples/web/DaedalusBitmapPathfinding.html",
    repo: "https://github.com/hxDaedalus/hxDaedalus"
  },
  {
    name: "Excel to PDF mail-merge",
    description: "Use entries from a Google/Excel spreadsheet to fill and download multiple PDFs, via API or CLI.",
    images: ["assets/excel_mail_merge_to_pdf_00.jpg", ],
    url: "https://www.upwork.com/freelancers/~01a0c41e84b3f00ea8?p=1843463777428619264",
    repo: ""
  },
  {
    name: "MidJourney Feed Downloader",
    description: "Extract and save images from MidJourney showcase feed.",
    images: ["assets/midjourney_feed_downloader_00.jpg", ],
    url: "https://www.youtube.com/watch?v=yUDKaDZFUig",
    repo: "https://github.com/azrafe7/midjourney_screenshotter"
  },
  {
    name: "Send 2 Photopea (Chrome Extension)",
    description: "Send images and videos right to Photopea with one-click.",
    images: ["assets/send_2_photopea_00.jpg", ],
    url: "https://chromewebstore.google.com/detail/send-2-photopea/ngjdphpkaopdenfbgkkkgmajgcmhpkme",
    repo: "https://github.com/azrafe7/send2photopea"
  },
  {
    name: "Element Zapper (Chrome Extension)",
    description: "Zap/remove any element. Get rid of annoying things on the internet.",
    images: ["assets/Element_Zapper_00.jpg", ],
    url: "https://chromewebstore.google.com/detail/element-zapper/noopjpinkmgojgljobbpbiehkhmaopio",
    repo: "https://github.com/azrafe7/elementZapper"
  },
  {
    name: "Pop Element (Chrome Extension)",
    description: "Pop out the current page (or an element) into a separate window.",
    images: ["assets/Pop_Element_00.jpg", ],
    url: "https://chromewebstore.google.com/detail/popelement/cbkjfkgogipoonckgoppiofacaocpfdj",
    repo: "https://github.com/azrafe7/POPElement"
  },
  {
    name: "Black & White Web (Chrome Extension)",
    description: "Browse the Web in Black & White.",
    images: ["assets/B&W_Web_00.jpg", ],
    url: "https://chromewebstore.google.com/detail/black-white-web/eeghanoecgfjjflojdbjhmdpcdjceldh",
    repo: "https://github.com/azrafe7/blackAndWhiteWeb"
  },
  {
    name: "Masterin Scraper",
    description: "Scrape masterin site with Python",
    images: ["assets/Masterin_Scraper_00.jpg", ],
    url: "https://www.youtube.com/watch?v=vxorDz8i6l4",
    repo: "https://github.com/azrafe7/scrape-masters-ita"
  },
  {
    name: "Maya scripts",
    description: "Handy scripts to speed up Maya workflow.",
    images: ["assets/maya_scripts_00.jpg", "assets/maya_scripts_01.jpg"],
    url: "https://www.youtube.com/watch?v=oWW7kGEasiQ",
    repo: ""
  },
  {
    name: "VLC 4 YouTube (Firefox Extension)",
    description: "Click the extension icon when you are on a YouTube™ page to open the current video in VLC (or just hit Alt+V).",
    images: ["assets/vlc_4_youtube_00.jpg", "assets/vlc_4_youtube_01.jpg", ],
    url: "https://addons.mozilla.org/it/firefox/addon/vlc-4-youtube-beta-4-firefox/",
    repo: ""
  },
  {
    name: "PDF Redactor",
    description: "A FastAPI service that redacts sections of PDFs using PyMuPDF, with a clean HTML frontend.",
    images: ["assets/PDF_Redactor_00.jpg", ],
    url: "https://pdf-redact-hgoj.onrender.com/",
    repo: "https://github.com/azrafe7/pdf-redact"
  },
  {
    name: "RSA Finder - Toscana",
    description: "Find/search/filter/visualize RSA facilities in Toscana (with map and real data). 🇮🇹 Mappa interattiva delle RSA in Toscana (con dati reali).",
    images: ["assets/RSA_Finder_00.jpg", "assets/RSA_Finder_01.jpg", ],
    url: "https://rsa-finder-toscana.onrender.com/",
    repo: "https://github.com/azrafe7/rsa-finder-toscana"
  },
  {
    name: "Reverse Geocode",
    description: "Reverse Geocode (from lat/lon to location)",
    images: ["assets/reverse_geocode_00.jpg", ],
    url: "https://reverse-geocoding.onrender.com/",
    repo: "https://github.com/azrafe7/reverse-geocoding"
  },
  {
    name: "Resave PDF",
    description: "Quickly preview and re-save PDF. Works with protected files and saves them without password. All happens locally, nothing leaves the browser.",
    images: ["assets/Resave_PDF_00.jpg", "assets/Resave_PDF_01.jpg", "assets/Resave_PDF_02.jpg", ],
    url: "https://resave-pdf.onrender.com/",
    repo: "https://github.com/azrafe7/resave-pdf"
  },
];

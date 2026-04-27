const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // FHD 16:9
  const W = 1920;
  const H = 1080;

  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });

  const filePath = path.resolve(__dirname, 'index.html');
  
  // PDF出力用の共通CSS
  const pdfStyle = `
    html, body { margin:0!important; padding:0!important; width:${W}px!important; }
    .deck { margin:0!important; padding:0!important; width:${W}px!important; max-width:none!important; }
    .slide {
      width:${W}px!important; height:${H}px!important;
      margin:0!important; border-radius:0!important; box-shadow:none!important;
      page-break-after:always!important; break-after:page!important;
      -webkit-print-color-adjust:exact!important; print-color-adjust:exact!important;
      display: none !important; /* 初期状態ですべて非表示 */
    }
    .slide:last-child { page-break-after:auto!important; break-after:auto!important; }
    
    /* 出し分けロジック */
    body.basic-mode .slide:not(.founding-only):not([data-version="founding"]) { display: flex !important; }
    body.fm-mode .slide:not(.basic-only) { display: flex !important; }

    /* スライド内の要素出し分け */
    body.basic-mode .founding-only { display: none !important; }
    body.fm-mode .basic-only { display: none !important; }
  `;

  async function generatePDF(mode, fileName) {
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
    
    await page.evaluate((m) => {
      document.body.className = m;
    }, mode);

    await page.addStyleTag({ content: pdfStyle });

    await page.pdf({
      path: path.resolve(__dirname, fileName),
      width: '508mm',
      height: '285.75mm',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
      preferCSSPageSize: false,
    });
    console.log(`✅ PDF生成完了: ${fileName}`);
  }

  // 1. 一般資料版 (Basic)
  await generatePDF('basic-mode', 'snapkarte-slides.pdf');

  // 2. ファウンディングメンバー版 (Founding Member)
  await generatePDF('fm-mode', 'snapkarte-slides_FoundingMember.pdf');

  await browser.close();
})();

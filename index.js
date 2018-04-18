/*let fs = require('fs'),
  PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(JSON.stringify(pdfData));
});

pdfParser.loadPDF("./test.pdf");*/

let excludeArray = ['No messages found in current search.'];

let PDFJS = require('pdfjs-dist');
PDFJS.getDocument('test.pdf').then(function(pdf) {
  pdf.getPage(2).then(function(page) {
    page.getTextContent({disableCombineTextItems: true}).then(function(txt) {
      let chunks = [];
      let prevSpot = 0;

      txt.items.forEach((item) => {
        let spot = item.transform[item.transform.length - 1];

        if(!excludeArray.includes(item.str)) {
          let chunk = [];
          item.str.split('   ').forEach(key => chunk.push(key));

          console.log(item, chunk);
          if ((prevSpot - spot) > 20 || prevSpot == 0) {
            console.log('new chunk');
            // Assume new line
            chunks.push(chunk);
          } else {
            console.log('append chunk');
            chunks[chunks.length - 1] += ` ${chunk}`;
          }
        }
        prevSpot = spot;
      });

      console.log(chunks);
    });
  });
});
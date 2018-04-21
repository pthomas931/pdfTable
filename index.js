let excludeArray = ['No messages found in current search.'];

let PDFJS = require('pdfjs-dist');
PDFJS.getDocument('test.pdf').then(function(pdf) {
  pdf.getPage(2).then(function(page) {
    page.getTextContent({disableCombineTextItems: true}).then(function(txt) {
      let chunks = [];
      let chunk = [];
      let prevSpot = 0;

      txt.items.forEach((item) => {
        let spot = item.transform[item.transform.length - 1];

        if(!excludeArray.includes(item.str)) {
          let chunkStr = [];
          item.str.split('   ').forEach(key => chunkStr.push(key));

          if ((prevSpot - spot) > 20 && prevSpot != 0) {
            // Assume new line
            chunks.push(chunk);
            chunk = [];
          }

          chunk.push(chunkStr);
        }
        prevSpot = spot;
      });

      console.log(chunks);
    });
  });
});
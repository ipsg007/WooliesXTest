export function priceInDigits(price: string) { 
        const x = price;         
          const patternMatchForPrice = '\\d+.*\\d+';
          const matches = x.match(patternMatchForPrice);
          const amountInDigits = parseFloat(
            matches && matches.length > 0 ? matches[0] : '',
          );
          return amountInDigits;   
}
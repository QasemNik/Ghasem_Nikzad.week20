function formatPrice(price) {
   let value = price
   let unit = "تومان"
   
  if (price >= 1_000_000_000) {
     value = price / 1_000_000_000;
     unit = "میلیارد تومان"

  } else if (price >= 1_000_000) {
     value = price / 1_000_000;
     unit = "میلیون"

   }else if (price >= 1_000) {
      value = price / 1_000;
      unit = "هزار";

   } 
   const currency = value.toLocaleString("fa-IR")

   return `${currency} ${unit}`
}
  
export {formatPrice}  
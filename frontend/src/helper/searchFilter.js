export default function searchFilter(products, searchTerm) {

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    
  return filteredProducts
}

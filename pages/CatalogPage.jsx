// importa hook react
import { useEffect, useState } from "react";
// importa axios
import axios from "axios";
// importa Link router
import { Link } from "react-router-dom";

// pagina catalogo riutilizzabile
export default function CatalogPage ({ fixedCategoryId }) {
  // stato prodotti
  const [allProducts, setAllProducts] = useState([]);
  // stato vista
  const [viewMode, setViewMode] = useState("grid");
  // stato ordinamento
  const [sortOption, setSortOption] = useState("name_asc");
  // stato ricerca
  const [searchTerm, setSearchTerm] = useState("");

  // effetto: carica prodotti 
  useEffect(() => {
    // richiesta prodotti
    axios.get("http://localhost:3000/products").then((response) => {
      // salva prodotti
      setAllProducts(response.data);
    });
  }, []);

  // copia lavorabile dei prodotti
  let visibleProducts = Array.isArray(allProducts) ? allProducts.slice() : [];

  // se ho categoria fissa filtro per category_id
  if (fixedCategoryId != null) {
    // confronto come stringa per evitare problemi di tipo
    visibleProducts = visibleProducts.filter((product) => {
      // ritorna solo prodotti con category_id uguale
      return (product.category_id + "") === (fixedCategoryId + "");
    });
  }

  // se ho testo di ricerca applico filtro
  if (searchTerm) {
    // preparo query in minuscolo
    const searchQuery = (searchTerm + "").toLowerCase();
    // filtro per nome o prezzo che contengono la query
    visibleProducts = visibleProducts.filter((product) => {
      // nome in minuscolo con fallback vuoto
      const productName = ((product.name || "") + "").toLowerCase();
      // prezzo come stringa con fallback
      const productPrice = (product.price != null ? product.price : "") + "";
      // mantieni se matcha nome o prezzo
      return productName.includes(searchQuery) || productPrice.includes(searchQuery);
    });
  }

  // prendo chiave e direzione da sortOption
  const [sortKey, sortDirection] = sortOption.split("_");
  // true se ascendente
  const isAscending = sortDirection === "asc";

  // ordina la lista visibile
  visibleProducts.sort((productA, productB) => {
    // valore A in base alla chiave
    const valueA = sortKey === "price" ? +productA.price : (productA.name || "");
    // valore B in base alla chiave
    const valueB = sortKey === "price" ? +productB.price : (productB.name || "");
    // confronta minore
    if (valueA < valueB) return isAscending ? -1 : 1;
    // confronta maggiore
    if (valueA > valueB) return isAscending ? 1 : -1;
    // uguali
    return 0;
  });

  // ritorna interfaccia
  return (
    // container pagina
    <div className="container py-4">
      {/* barra controlli */}
      <div className="d-flex flex-wrap align-items-end gap-3 mb-4">
        {/* blocco ricerca */}
        <div className="flex-grow-1">
          {/* etichetta input */}
          <label htmlFor="searchProducts" className="form-label mb-1">Cerca</label>
          {/* input ricerca */}
          <input
            id="searchProducts"
            className="form-control"
            placeholder="Cerca un prodotto..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {/* blocco vista */}
        <div className="d-flex align-items-center gap-2">
          {/* testo vista */}
          <span className="fw-semibold text-uppercase">Visualizza</span>
          {/* bottone griglia */}
          <button
            type="button"
            className={`btn btn-outline-dark ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            Griglia
          </button>
          {/* bottone lista */}
          <button
            type="button"
            className={`btn btn-outline-dark ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            Lista
          </button>
        </div>

        {/* blocco ordinamento */}
        <div className="ms-auto">
          {/* etichetta select */}
          <label className="form-label mb-1">Ordina per</label>
          {/* select ordinamento */}
          <select
            className="form-select"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            {/* opzione nome asc */}
            <option value="name_asc">Nome A-Z</option>
            {/* opzione nome desc */}
            <option value="name_desc">Nome Z-A</option>
            {/* opzione prezzo asc */}
            <option value="price_asc">Prezzo crescente</option>
            {/* opzione prezzo desc */}
            <option value="price_desc">Prezzo decrescente</option>
          </select>
        </div>

        {/* conteggio risultati */}
        <div className="text-muted">{visibleProducts.length} risultati</div>
      </div>

      {/* messaggio nessun gioco solo se cerchi e non trovi */}
      {searchTerm && visibleProducts.length === 0 && (
        // box messaggio
        <div className="py-5">Nessun gioco trovato</div>
      )}

      {/* lista prodotti se ci sono */}
      {visibleProducts.length > 0 && (
        // se vista griglia
        viewMode === "grid" ? (
          // griglia bootstrap
          <div className="row g-3">
            {/* ciclo prodotti */}
            {visibleProducts.map((product) => (
              // colonna card
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* card prodotto */}
                <div className="card h-100" style={{ border: "1px solid #e5e5e5" }}>
                  {/* link al dettaglio */}
                  <Link to={`/dettaglio-prodotto/${product.slug}`} className="text-decoration-none" style={{ color: "inherit" }}>
                    {/* immagine prodotto */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      loading="lazy"
                      style={{ height: "250px", width: "100%", objectFit: "cover" }}
                    />
                    {/* corpo card */}
                    <div className="card-body">
                      {/* nome prodotto */}
                      <h6 className="card-title mb-2">{product.name}</h6>
                      {/* prezzo prodotto */}
                      <div className="fw-bold">€ {Number(product.price).toFixed(2)}</div>
                    </div>
                  </Link>
                  {/* footer card */}
                  <div className="card-footer bg-white border-0">
                    {/* bottone carrello */}
                    <button
                      type="button"
                      className="btn btn-dark btn-sm w-100"
                      onClick={() => {
                        // aggiunge al carrello via api
                        axios.post("http://localhost:3000/cart", product);
                        // avviso semplice
                        alert(`${product.name} è stato aggiunto al carrello`);
                      }}
                    >
                      Aggiungi al carrello
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // se vista lista
          <div className="vstack gap-2">
            {/* ciclo prodotti */}
            {visibleProducts.map((product) => (
              // riga prodotto
              <div key={product.id} className="border rounded p-3 d-flex gap-3 align-items-center">
                {/* link immagine */}
                <Link to={`/dettaglio-prodotto/${product.slug}`}>
                  {/* immagine mini */}
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: 6 }}
                  />
                </Link>
                {/* info testo */}
                <div className="flex-grow-1">
                  {/* link nome */}
                  <Link to={`/dettaglio-prodotto/${product.slug}`} className="text-decoration-none text-dark" style={{ fontWeight: 500 }}>
                    <h6 className="mb-1">{product.name}</h6>
                  </Link>
                </div>
                {/* prezzo a destra */}
                <div className="fw-bold" style={{ minWidth: 120, textAlign: "right" }}>
                  € {Number(product.price).toFixed(2)}
                </div>
                {/* bottone a destra */}
                <div style={{ minWidth: 180, textAlign: "right" }}>
                       {/* bottone carrello */}
                    <button
                      type="button"
                      className="btn btn-dark btn-sm w-100"
                      onClick={() => {
                        // aggiunge al carrello via api
                        axios.post("http://localhost:3000/cart", product);
                        // avviso semplice
                        alert(`${product.name} è stato aggiunto al carrello`);
                      }}
                    >
                      Aggiungi al carrello
                    </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

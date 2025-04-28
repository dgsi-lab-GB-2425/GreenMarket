// src/pages/Home.jsx
function Home() {
    return (
      <div className="home-page">
        <div className="container">
          <h1>Bienvenido a GreenMarket</h1>
          <p>
            Conecta con productores ecológicos locales y disfruta de productos frescos con trazabilidad transparente.
          </p>
          <img
            src="/logo.png"
            alt="GreenMarket Logo"
            className="home-logo"
          />
          <div className="home-actions">
            <a href="/pedidos" className="btn">Ver Pedidos</a>
            <a href="/trazabilidad" className="btn secondary">Consultar Trazabilidad</a>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;
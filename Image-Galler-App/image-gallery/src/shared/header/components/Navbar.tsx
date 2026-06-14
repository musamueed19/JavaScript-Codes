const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          ⚡Firestock
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Tabs */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home Nav Tab */}
            <li className="navbar-item">
              <a href="/" className="nav-link active" aria-current="page">
                Home
              </a>
            </li>
            {/* Upload Image Tab */}
            <li className="navbar-item">
              <a href="/upload-image" className="nav-link" aria-current="page">
                Upload Image
              </a>
            </li>
          </ul>

          {/* Login Dropdown */}
          <div className="nav-item dropdown me-4">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Login
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="/login">Login</a>
              </li>
              <li className="dropdown-item">
                <a href="/register">Get Started</a>
              </li>
            </ul>
          </div>

          {/* Form => searchbar, search btn */}
          <form role="search" className="d-flex">
            <input
              type="search"
              placeholder="Search..."
              className="form-control me-2"
              aria-label="Search"
            />
            <button type="submit" className="btn btn-outline-success">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

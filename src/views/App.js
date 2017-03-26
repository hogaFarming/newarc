import React from 'react';

function App({
    children
  }) {
  return (
    <div>
      <header>app header</header>
      <nav>left nav</nav>
      <div>
        {children}
      </div>
    </div>
  );
}

export default App;

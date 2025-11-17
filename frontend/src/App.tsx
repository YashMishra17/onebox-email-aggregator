import React from 'react';
import EmailList from './components/EmailList';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Onebox Email Aggregator</h1>
      <EmailList />
    </div>
  );
}

export default App;

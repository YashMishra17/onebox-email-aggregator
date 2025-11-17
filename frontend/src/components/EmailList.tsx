import React from 'react';

const EmailList = () => {
  const emails = [
    { id: 1, subject: 'Test Email 1', label: 'Interested' },
    { id: 2, subject: 'Test Email 2', label: 'Spam' }
  ];

  return (
    <div>
      {emails.map(e => (
        <div key={e.id} className="p-2 border mb-2">
          <strong>{e.subject}</strong> - <em>{e.label}</em>
        </div>
      ))}
    </div>
  );
};

export default EmailList;

import React from 'react';

export default ({ children, title }) => {
  return (
    <html>
      <head>
        <title>{ title }</title>
        <meta charSet='utf-8'/>
      </head>
      <body>
        { children }
      </body>
    </html>
  );
};

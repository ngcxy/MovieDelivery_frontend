import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copyright}>&copy; {currentYear} All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    padding: '20px 0',
    textAlign: 'center',
    width: '100%',
    // position: 'absolute',
    left: 0,
    // bottom: 0,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  copyright: {
    margin: 0,
  },
};

export default Footer;
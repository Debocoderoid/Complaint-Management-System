module.exports = {
  proxy: 'http://localhost:3000',
  port: 3001,
  files: ['web/**/*', 'server/**/*'],
  open: false,
  notify: false,
};

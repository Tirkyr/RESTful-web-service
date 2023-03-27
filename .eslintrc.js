module.exports = {
  extends: 'airbnb-base',
  rules: {
    'comma-dangle': 0,
    'no-param-reassign': [2, { props: false }]
  },
  env: {
    node: true,
    mocha: true
  }
};

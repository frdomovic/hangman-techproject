function scorefunction(quote_length, quote_uniq, errors, duration) {
  return Math.round(
    ((quote_length + quote_uniq) * 100) / (errors + duration / 1000 + 1)
  );
}

module.exports = scorefunction;
//OK

const isPrime = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const primeNumbers = (number) => {
  let primes = [];

  for (let i = 0; i < number; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
};

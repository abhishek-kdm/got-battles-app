type FetchJson = (input: RequestInfo, init?: RequestInit | undefined) => any;

export const fetchJson: FetchJson = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * @description previous callback gets cancelled
 * and the new callback starts to evaluate
 * (if this gets called before delay, the delay is over).
 * 
 * using this for multiple callback functions is not a good idea right now.
 */
export const refreshableCallback = (() => {
  let t: any;
  return (
    f: (...a: any[]) => void | Promise<void>,
    delay: number
  ) => {
    clearTimeout(t);
    t = (() => setTimeout(f, delay))();
  }
})();

// @TODO make this interesting.
export const constructString = (option: any) => (
  `${option.name} on ${option.year}`
);


export const fancyNumber = (n: number | null): string => {
  if (n != null) {
    return n >= 1000 ? (n / 1000.00).toString() + 'K' : n.toString();
  }
  return '--';
}
